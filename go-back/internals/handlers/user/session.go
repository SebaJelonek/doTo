package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	jwt "github.com/SebaJelonek/doTo/internals/jwt"
)

type DBUser struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Session(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user DBUser
		authToken := r.Header.Get("Authorization")
		id := jwt.DecodeUserID(authToken)

		log.Println("id", id)

		w.Header().Set("Content-Type", "application/json")

		err := dbConnection.QueryRow("SELECT id, name, email FROM USERS WHERE id = $1", id).Scan(&user.ID, &user.Name, &user.Email)
		if err != nil {
			log.Fatal("user - session - query - error: ", err)
			http.Error(w, "Internal server error", 500)
			return
		}

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "Internal server error", 500)
			log.Println("user - session - JSON encode error:", err)
			return
		}
	}
}
