package items

import (
	"database/sql"
	"net/http"
)

func Delete(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// id:= r.URL.

	}
}
