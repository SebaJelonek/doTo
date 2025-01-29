package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	Name string `json:"name"`
}

func AddUser(dbConnection *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var user User

		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "something went sideways...", 500)
			log.Println("error", err)
			return
		}
		log.Println("we did decode name: ", user.Name)
		result, err := dbConnection.Exec("INSERT INTO Users (Name) VALUES ($1)", user.Name)
		if err != nil {
			http.Error(w, "DB operation failed", 422)
			log.Println("error: ", err)
			return
		}
		log.Println("we made the query")
		affected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "no rows affected...", 422)
			log.Println("error: ", err)
			return
		}

		if affected < 1 {
			http.Error(w, "no rows affected...", 422)
			log.Println("error: ", err)
			return
		}
		log.Println("added record to db")
		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "success",
			"message": "User added",
		})
	}
}
