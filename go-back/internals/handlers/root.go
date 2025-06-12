package handlers

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

func Root(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user DBUser
		cookie, err := r.Cookie("jwt")
		if err != nil {
			http.Error(w, "Session expired please log in", 401)
		}
		var id = jwt.Decode(cookie.Value)
		log.Println("root id", id)
		w.Header().Set("Content-Type", "application/json")
		err = dbConnection.QueryRow("SELECT id, name, email FROM USERS WHERE id = $1", id).Scan(&user.ID, &user.Name, &user.Email)
		if err != nil {
			log.Fatal("error: ", err)
		}

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "Error encoding JSON", 500)
			log.Println("JSON encode error: ", err)
			return
		}
	}
}

// i went on a break i just created the root.go

// i have package handlers there

// now i need to create the function

// so func nameoffunction
// so this function has to return http.
