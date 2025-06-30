package items

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func Delete(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		url := r.URL.Path
		itemId, found := strings.CutPrefix(url, "/api/delete/")
		if found != true {
			http.Error(w, "Item id not found", 404)
			return
		}
		id, err := strconv.ParseInt(itemId, 10, 32)
		if err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", 500)
		}
		dbConnection.Exec("DELETE FROM items WHERE id = $1", id)

		log.Println("item id", id)

		w.WriteHeader(201)

	}
}
