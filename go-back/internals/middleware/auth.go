package middleware

import (
	"database/sql"
	"log"
	"net/http"
	"time"

	jwt "github.com/SebaJelonek/doTo/internals/jwt"
)

func Auth(dbConnection *sql.DB, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var userName string
		println("🟠 Auth running for ", r.URL.Path)
		authToken := r.Header.Get("Authorization")
		sessionCookie, err := r.Cookie("jwt")
		if err != nil {
			log.Println("cookie error", err)
			http.Error(w, "Please log in", 403)
			return
		}

		sessionToken := sessionCookie.Value

		isAuthValid, userID := jwt.Validate(authToken, "auth")
		if isAuthValid {
			err := dbConnection.QueryRow("SELECT name FROM users WHERE id = $1", userID).Scan(&userName)
			if err != nil {
				http.Error(w, "something went wrong", 500)
				log.Println("is Auth Valid query", err)
				return
			}

			// w.Header().Set("Authorization", authToken)
			handler(w, r)

		} else { //auth is invalid
			isSessionValid, userID := jwt.Validate(sessionToken, "sessions")
			issuedAt := time.Now().UnixMilli()
			var payload = jwt.Payload{
				UserID:     userID,
				IssuedAt:   issuedAt,
				Expiration: issuedAt + time.Now().Add(time.Hour/2).UnixMilli(),
			}

			if isSessionValid {
				jwt := jwt.Generate(jwt.GetHeader(), payload, "auth")
				err := dbConnection.QueryRow("SELECT name FROM users WHERE id = $1", userID).Scan(&userName)
				if err != nil {
					http.Error(w, "something went wrong", 500)
					log.Println("is Session Valid query", err)
					return
				}

				w.Header().Set("Authorization", "Bearer "+jwt)

				handler(w, r)
			} else {
				http.Error(w, "Session expired, please log in again", 403)
				log.Println("session is expired", err)
				return
				/*
					for now...
					later i will check the the exp date
					if it is about to expire example >23rd day or so
					i am going to renew the session token
				*/
			}
		}
	}
}
