package handlers

import (
	"database/sql"
	"net/http"
)

func AddUser(dbConnection *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

	}
}
