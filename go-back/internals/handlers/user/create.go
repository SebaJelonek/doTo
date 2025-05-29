package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type UserCreate struct {
	Name          string `json:"username"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	PasswordCheck string `json:"passwordCheck"`
}

func AddUser(dbConnection *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var user UserCreate
		var userID int
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

		hashedPassword, err := hashPassword(user.Password)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println("Error while hashing password ", err)

		}

		err = dbConnection.QueryRow(`
		INSERT INTO users (Name, email, password)
		VALUES ($1, $2, $3)
		RETURNING id`, user.Name, user.Email, hashedPassword).Scan(&userID)
		if err != nil {
			if strings.Contains(err.Error(), `pq: duplicate key value violates unique constraint "users_email_key"`) {
				http.Error(w, "User with this email already exists", 409)
				log.Println(err)
				return
			}
			http.Error(w, "DB operation failed", 500)
			log.Println("error: ", err)
			return
		}

		log.Println("we made the query")
		log.Println("added record to db")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(map[string]int{
			"id": userID,
		})
	}
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
