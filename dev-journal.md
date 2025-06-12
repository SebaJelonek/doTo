### 🗓️ **May 26, 2025 — Day 1: Kickoff, .env confusion, CORS pain, and JSON format issues**

- 🐛 **`.env` loading issue**: Initial bug caused by `server.go` not finding `.env`. Realized it’s about the _current working directory_, not file location. Fixed by running `go run ./cmd/main/main.go`.
- 🌐 **CORS config mismatch**: Frontend request failed because `Access-Control-Allow-Headers` was not set. Fixed it with:

  ```go
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  ```

- ⚠️ **JSON decoding issues**:

  - Sent malformed JSON like `{ creator "Seba" ... }`.
  - Backend expected `time.Time` for deadline, but frontend sent milliseconds.
  - Switched `DeadLine` to `int64` to store UNIX timestamp safely.

---

### 🗓️ **May 27, 2025 — Day 2: Struct mismatch, DB types, and user lookup**

- ❌ **`json: cannot unmarshal string into Go struct field`**: Sent string `"Seba"` for `owner`, but Go expected `int`. Fixed by:

  - Changing struct to `owner string`.
  - Then **re-resolved to IDs** by querying user ID from `users` table.

- 🧠 **Learned foreign key mismatch pain**: Couldn’t change `owner` column to `text` because it's a foreign key → opted to resolve string to `int` in backend.
- 🧪 **Introduced DB lookup** for resolving owner username to user ID:

  ```go
  SELECT id FROM users WHERE name = $1


  Used `QueryRow().Scan()` with inline `if err := ...; err != nil` form.
  ```

---

### 🗓️ **May 28, 2025 — Day 3: Scan error fix and task completion feature**

- 🧩 Fixed a **Go `sql.Scan()` type mismatch** on `start_time` caused by improper type in DB.
- 🎯 Wrote `completeTask.go` mostly independently.
- 💡 Leveraged `json.NewDecoder(r.Body).Decode()` for easier debugging.
- ✅ Implemented conditional `http.HandleFunc("/api/task")` with method-switch logic:

  ```go
  switch r.Method {
    case POST → AddTask
    case PUT → CompleteTask
    case DELETE → DeleteTask
  }
  ```

---

### 🗓️ **May 29, 2025 — Day 4: Planning JWT, register, and login flow**

- 🧠 No actual coding — instead:

  - Planned JWT session structure: short-lived access token + long-lived refresh token.
  - Drafted auto-login flow post-registration, with **email verification delay**.

- 🔐 Discussed bcrypt hashing and cost factor logic (e.g., `bcrypt.GenerateFromPassword(..., 14)`).
- 🧱 Proposed access control based on `is_verified = true`.

---

### 🗓️ **May 30, 2025 — Day 5: Email verification architecture**

- 📨 Planned full email verification system:

  - Tokenized verification link with expiry.
  - `is_verified = true` flag update.
  - Logic for blocking/deleting unverified users after 24–72h.

- ✅ Confirmed PostgreSQL schema with `email UNIQUE`, and chose not to enforce uniqueness on `name`.

---

### 🗓️ **June 1–2, 2025 — Day 6–7: CORS middleware finalized and tasks fetch begins**

- 🧰 Built and wrapped all routes with a `CorsHandler()` middleware to handle preflight requests.
- 🧠 Discovered that **trailing slashes in fetch URLs** on frontend can break CORS preflight.
- 🔍 Investigated cookie issues (missing on GET) and realized:

  - `SameSite=None; Secure` fails without HTTPS.
  - Switched to `SameSite=Lax; Secure=false` which works on localhost with `credentials: 'include'`.

---

### 🗓️ **June 3, 2025 — Day 8: Fetch tasks works end-to-end**

- ✅ Created the GET handler to **fetch tasks by authenticated user**.
- 🔐 User ID extracted from token (manually, for now).
- 📥 SQL query built to join `users` and `tasks` and retrieve owned/created tasks.
- 🐛 Fought cookie/session issues — JWT set, but browser wasn’t sending it.

  - Realized due to browser origin, cookie domain, or missing `credentials: 'include'`.

---

### 🗓️ **June 4, 2025 — Day 9: JWT cookie validation logic + CORS cleanup**

- ✅ Wrote `CorsHandler` with:

  - Preflight handling,
  - All necessary CORS headers.

- 🔐 Implemented cookie-based JWT storage:

  ```go
  &http.Cookie{
    Name: "jwt", Value: jwt,
    HttpOnly: true, Secure: false,
    SameSite: http.SameSiteLaxMode
  }
  ```

- 🛠️ Cookie worked in response, but **not attached to future requests** due to frontend misconfig or missing browser-side `credentials`.

---

### 🗓️ **June 5, 2025 — Day 10: JWT validation + middleware planning**

- 🧠 Implemented JWT decoding + validation logic:

  - Signature validation (`alg` check),
  - Claims parsing (`user_id`, `session_id`, `exp`).
  - Optional DB lookup for session ID.

- 🔄 Discussed versioned token design: JWT is stateless, but versioning (via `jti`) makes it _optionally stateful_.

---

### 🗓️ **June 6, 2025 — Day 11: Token rotation design**

- 🔁 Completed rotation logic for:

  - Receiving refresh token,
  - Validating and invalidating the old one,
  - Generating new tokens,
  - Saving new `jti` in DB.

- 🧱 Middleware finalized for protected route access:

  - Extracts token,
  - Validates and extracts user info,
  - Allows access or returns 401.

---

### 🗓️ **June 9-10, 2025 — Days 12 and 13: Token rotation implementation**

🚧 Struggles & Debugging

    Circular Imports: Ran into Go's import cycle not allowed error when trying to access ValidateJWT logic from different handler packages. Solved by extracting JWT-related code into its own jwt/ package. This helped untangle responsibilities and avoid cross-dependencies.

    Token distinction logic: Needed a reliable way to differentiate between short-lived auth tokens and long-lived session tokens. Originally used jti != nil as a check, which works but feels implicit. Considered alternatives like a TokenType or iss field for more explicit validation but decided to keep jti for now due to its simplicity.

    Zero iat bug: Auth tokens were being generated with iat: 0. With help from DeepSeek, realized this was a bug — now using time.Now().UnixMilli() to generate accurate timestamps.

✅ What I Implemented

    /auth endpoint (named AuthCheck) that:

        Validates the auth token if present.

        Falls back to the session token if auth is expired.

        Regenerates a new auth token if session is still valid.

        Returns user info (id, name) on success.

    useEffect() hook on the frontend (login view) that calls /auth immediately when the app loads.

        If the backend confirms the session is valid, it updates the frontend user state and seamlessly transitions from login screen to main app.

    JWT payload structure improvements:

        Optional jti field using *int + omitempty for session tokens only.

        Corrected and consistent iat and exp timestamps.

        Added iss (issuer) support for future-proofing.

🔒 Security Learnings

    Short-lived tokens reduce exposure if leaked (30 min expiry for auth).

    Session tokens can be refreshed silently from the backend when nearing expiration (e.g., at day 25 of a 30-day session).

    No sensitive data in JWTs (only uid, iat, exp, jti, and optionally iss).

    The signature changes as expected when payload changes, even if header remains the same.

🔄 Improvements for UX

    Silent token renewal now fully happens on the backend — the client doesn't even see a 401 during refresh.

    Frontend doesn't need redirect/retry logic anymore.

    Session expiration is the only reason a user ever sees a forced login again.

📚 What I Learned

    How to structure Go packages to avoid circular imports and maintain modular code.

    Best practices for JWT design (e.g., why jti, iss, and iat matter).

    How to use Go pointers + omitempty for optional fields in JSON structs.

    How to build a transparent, secure token refresh mechanism entirely in middleware.

### 🗓️ **June 11, 2025 — Days 14: Auth changes, Email sending implementation **

🚧 Struggles & Debugging

1.  I was using the id which is coming from the /auth endpoint

But once i change the endpoint to middleware i could not use the id
I did not send it via json so frontend could not use it this way

So i added decode.go which is called in / endpoint which i now use to check if there is session
Once you enter the frontend the call is made to / and it decodes the session cookie
Gets the id from there and sends it back to json

2.  Once i got this working i struggeled to update the state of the top level component(App)
    There is a ternery which either returns the login view or app view
    But the call was made from loginform which is 4 levels lower
    because i did not want to prop drill i used jotai useAtom to do it

but... the state on the top was not visible
because provider is underneath the App component
So i was trying different approaches of useEffect to have it captured

Finally i update the user with jotai atom
once its changed the component beneath App is waiting for the change made to user object
once the change is done the setState(coming from App as prop) function changes the id
and the view changes to app view instead of login

3.  Full on issues with sending email with mail.com
    I finally switched to brevo.com which also did not work at the beginning

The issue was that while using Brevo you provide their relayed email e.g. 8f6f36001@smtp-brevo.com
this email is not authenticated and fails to send any messages

you need to use your own email but when trying to "login"(smtp auth) with your email it fails
so... you use the email from brevo to auth yourself
but... while building the message you need to use your verified email as "from" in order for it to work

Took way too long to have it working

✅ What I Implemented

I have once again changed the folder structure and naming conventions
I have moved jwt outside of handlers, its in internals now

I have added the middleware folder, auth and cors are there
I have changed names of jwt functions
from: GenerateJWT
to: Generate

so the usage of imported changed
from: jwt.GenerateJWT
to: jwt.Generate

## 🔚 Summary of Features Completed

| Feature                      | Status            |
| ---------------------------- | ----------------- |
| `.env` load bug              | ✅ Fixed          |
| CORS setup (manual)          | ✅ Done           |
| Task creation endpoint       | ✅ Done           |
| Task completion              | ✅ Done           |
| Task fetch (authenticated)   | ✅ Done           |
| Cookie JWT auth              | ✅ Works (in dev) |
| JWT parsing + validation     | ✅ Done           |
| Token rotation + refresh JWT | ✅ Done           |
| Folder structure & handlers  | ✅ Restructured   |
| Email verification           | 📝 Planned        |

---

## 🚀 Next Steps & Plan

- ⏰ **Deadline notification feature**  
  Implement a system to notify the owner of a task via email when the deadline is approaching.

- 📲 **Barcode cards view & management**  
  Add a new feature to upload and centrally store various shopping app benefit cards (e.g., Biedronka app, Lidl Plus, etc.) with barcode support.

- ✅ **Task completion restriction**  
  Ensure that only the task owner can mark a task as completed.

- ❌ **Task deletion restriction**  
  Ensure that only the task creator can delete (approve deletion of) the task.

- 🛒 **Shopping view backend integration**  
  Implement all backend endpoints, database queries, and logic to support the shopping list/barcode view features.

- 👥 **Group system for users**  
  Build support for user groups to reflect real-life contexts like households, trips, or friend projects.

  - Users can add/remove others by **email** (since it's unique, the name is not)
  - Send email notifications on **invitations and group changes**
  - Support assigning tasks within the group using usernames only(assigning tasks is done by name, which is not unique)

- 🚢 **Deployment & merging**  
  After completing the token rotation implementation and shopping view integration, deploy the application and merge the `dev` branch into `main`.

---

### Additional ideas / considerations

- Implement **logging and monitoring** to track critical events such as failed logins, token refresh attempts, and email notification deliveries.
- Add **rate limiting** to protect sensitive endpoints like login and token refresh.
- Build a **retry mechanism** for sending deadline notification emails to handle temporary failures.
- Plan for **unit and integration tests** for new features to improve code stability.
- Consider **role-based access control (RBAC)** in the context of groups for finer-grained task and settings control.

---
