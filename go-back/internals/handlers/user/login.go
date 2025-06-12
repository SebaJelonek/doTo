package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	jwt "github.com/SebaJelonek/doTo/internals/jwt"
	"golang.org/x/crypto/bcrypt"
)

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Password string
}

func LoginUser(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var userLogin UserLogin
		var user User
		err := json.NewDecoder(r.Body).Decode(&userLogin)
		if err != nil {
			http.Error(w, "Json error", 422)
			log.Println("Json error ", err)
			return
		}

		err = dbConnection.QueryRow("SELECT id, name, password FROM users WHERE email ILIKE $1", userLogin.Email).Scan(&user.ID, &user.Name, &user.Password)
		if err != nil {
			if strings.Contains(err.Error(), "no rows") {
				http.Error(w, "This email does not exist", 404)
				return
			} else {
				http.Error(w, "Error", 500)
				log.Println("Query error", err)
				return

			}
		}

		isCorrect := CheckPassword(userLogin.Password, user.Password)

		if isCorrect {
			sessionExpireDate := time.Now().Add(time.Hour * 24 * 30)
			authExpireDate := time.Now().Add(time.Minute * 30).UnixMilli()
			jti := 1
			header := jwt.Header{
				Alg:  "HS256",
				Type: "JWT",
			}

			payloadAuth := jwt.Payload{
				UserID:     user.ID,
				IssuedAt:   time.Now().UnixMilli(),
				Expiration: authExpireDate,
			}

			payloadSession := jwt.Payload{
				UserID:     user.ID,
				IssuedAt:   time.Now().UnixMilli(),
				Expiration: sessionExpireDate.UnixMilli(),
				JWTID:      &jti,
			}

			jwtAuth := jwt.Generate(header, payloadAuth, "auth")
			jwtSession := jwt.Generate(header, payloadSession, "session")

			jwtCookie := &http.Cookie{
				Name:     "jwt",
				Value:    jwtSession,
				Path:     "/",
				Domain:   "localhost",
				Expires:  sessionExpireDate,
				HttpOnly: true,
				Secure:   false,
				SameSite: http.SameSiteLaxMode,
			}

			http.SetCookie(w, jwtCookie)

			w.Header().Set("Authorization", "Bearer "+jwtAuth)
			w.Header().Set("Content-Type", "application/json")

			w.WriteHeader(200)

			json.NewEncoder(w).Encode(map[string]any{
				"id":   user.ID,
				"name": user.Name,
			})
			return
		} else {
			http.Error(w, "Password do not match", 401)
			return
		}

	}

}

func CheckPassword(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
