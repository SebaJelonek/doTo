package users

import (
	"database/sql"
	"log"
	"net/http"
)

func Verify(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.URL.Query().Get("token")

		_, err := dbConnection.Exec("UPDATE users WHERE token = $1", token)
		if err != nil {
			log.Println("something went wrong", err)
			http.Error(w, "Verification failed", 500)
		}
		/*
			serv a page with verification
			redirect to frontend

		*/
	}
}
