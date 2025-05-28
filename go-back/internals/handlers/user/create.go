package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type UserCreate struct {
	Name          string `json:"name"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	PasswordCheck string `json:"passwordCheck"`
}

func AddUser(dbConnection *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var user UserCreate

		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "something went sideways...", 422)
			log.Println("error", err)
			return
		}
		defer r.Body.Close()

		if user.Password != user.PasswordCheck {
			http.Error(w, "Passwords do not match", 401)
			return
		}

		log.Println("we did decode name: ", user.Name)
		result, err := dbConnection.Exec("INSERT INTO Users (Name) VALUES ($1)", user.Name)
		if err != nil {
			http.Error(w, "DB operation failed", 500)
			log.Println("error: ", err)
			return
		}

		log.Println("we made the query")
		affected, err := result.RowsAffected()
		if err != nil || affected < 1 {
			http.Error(w, "no rows affected...", 500)
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
