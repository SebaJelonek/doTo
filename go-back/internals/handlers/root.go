package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func Root(dbConnection *sql.DB) http.HandlerFunc {
	rows, err := dbConnection.Query("SELECT * FROM USERS")
	if err != nil {
		log.Fatal("error: ", err)
	}
	defer rows.Close()

	var users []User

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Name); err != nil {
			log.Println("error scanning row: ", err)
			continue
		}
		log.Println(user.ID, " ", user.Name)
		users = append(users, user)
	}
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		err := json.NewEncoder(w).Encode(users)
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
