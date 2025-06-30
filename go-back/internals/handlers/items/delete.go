package items

import (
	"database/sql"
	"log"
	"net/http"
)

func Delete(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.URL.Query()
		log.Println(id)

	}
}
