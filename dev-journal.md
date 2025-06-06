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

## 🔚 Summary of Features Completed

| Feature                      | Status            |
| ---------------------------- | ----------------- |
| `.env` load bug              | ✅ Fixed          |
| CORS setup (manual)          | ✅ Completed      |
| Task creation endpoint       | ✅ Done           |
| Task completion              | ✅ Done           |
| Task fetch (authenticated)   | ✅ Done           |
| Cookie JWT auth              | ✅ Works (in dev) |
| JWT parsing + validation     | ✅ Done           |
| Email verification plan      | 📝 Planned        |
| Token rotation + refresh JWT | ✅ Designed       |
| Folder structure & handlers  | ✅ Restructured   |

---

## 🚀 Next Steps & Plan

- 🔄 **Token rotation implementation**  
  Although token rotation design is completed, the actual implementation is still on the way. This feature will be huge for security and session management.

- ⏰ **Deadline notification feature**  
  Implement a system to notify the owner of a task via email when the deadline is approaching.

- 📲 **Barcode cards view & management**  
  Add a new feature to upload and centrally store various shopping app benefit cards (e.g., Biedronka app, Lidl Plus, etc.) with barcode support.

- ✅ **Task completion restriction**  
  Ensure that only the task owner can mark a task as completed.

- ❌ **Task deletion restriction**  
  Ensure that only the task creator can delete (approve deletion of) the task.

- 🛒 **Shopping view backend integration**  
  Implement all backend endpoints, database queries, and logic to support the shopping/barcode cards feature.

- 👥 **Group system for users**  
  Build support for user groups to reflect real-life contexts like households, trips, or friend projects.

  - Users can add/remove others by **email** (since it's unique)
  - Send email notifications on **invitations and group changes**
  - Support assigning tasks within the group using usernames

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
