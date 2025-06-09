package jwt

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	jwt "github.com/SebaJelonek/doTo/internals/handlers/jwt/utils"
)

func AuthCheck(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authToken := r.Header.Get("Authorization")
		var userName string
		sessionToken, err := r.Cookie("jwt")
		if err != nil {
			log.Println(err)
		}

		isValid, userID := jwt.ValidateJWT(authToken, "auth")
		if isValid {
			rows, err := dbConnection.Query("SELECT name FROM users WHERE id = $1", userID)
			if err != nil {
				http.Error(w, "something went wrong", 500)
			}

			defer rows.Close()
			rows.Scan(&userName)

			// http.SetCookie(w, sessionToken)

			w.Header().Set("Authorization", "Bearer "+authToken)
			w.Header().Set("Content-Type", "application/json")

			w.WriteHeader(200)

			json.NewEncoder(w).Encode(map[string]any{
				"id":   userID,
				"name": userName,
			})
		} else {
			isValid, userID := jwt.ValidateJWT(sessionToken.Value, "sessions")
			issuedAt := time.Now().UnixMilli()

			var payload = jwt.Payload{
				UserID:     userID,
				IssuedAt:   issuedAt,
				Expiration: issuedAt + time.Now().Add(time.Hour/2).UnixMilli(),
			}
			if isValid {
				jwt := jwt.GenerateJWT(jwt.GetHeader(), payload, "auth")
				rows, err := dbConnection.Query("SELECT name FROM users WHERE id = $1", userID)
				if err != nil {
					http.Error(w, "something went wrong", 500)
				}

				defer rows.Close()
				rows.Scan(&userName)

				// http.SetCookie(w, sessionToken)

				w.Header().Set("Authorization", "Bearer "+jwt)
				w.Header().Set("Content-Type", "application/json")

				w.WriteHeader(200)

				json.NewEncoder(w).Encode(map[string]any{
					"id":   userID,
					"name": userName,
				})
			} else {
				http.Error(w, "Session expired, please log in again", 403)
			}
		}
	}
}
