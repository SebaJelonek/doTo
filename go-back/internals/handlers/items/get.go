package items

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func Get(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var items []Item

		rows, err := dbConnection.Query("SELECT * FROM items")
		if err != nil {
			log.Println("items - get - db - err", err)
			http.Error(w, "Internal server error", 500)
			return
		}

		rows.Close()

		for rows.Next() {
			var item Item

			err := rows.Scan(&item.Name, &item.Id)
			if err != nil {
				log.Println("items - get - scan error", err)
				http.Error(w, "Internal server error", 500)
				return
			}
			items = append(items, item)
		}

		w.Header().Set("Content/Type", "application/json")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(items)
	}
}
