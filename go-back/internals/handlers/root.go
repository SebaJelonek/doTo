package handlers

import (
	"database/sql"
	"net/http"
)

type DBUser struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Root(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(201)
		return
	}
}

// i went on a break i just created the root.go

// i have package handlers there

// now i need to create the function

// so func nameoffunction
// so this function has to return http.
