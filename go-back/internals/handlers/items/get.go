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

		defer rows.Close()

		for rows.Next() {
			var item Item

			err := rows.Scan(&item.Id, &item.Name)
			log.Println("item", item)
			if err != nil {
				log.Println("items - get - scan error", err)
				http.Error(w, "Internal server error", 500)
				return
			}
			log.Println("item", item)
			items = append(items, item)
		}

		log.Println("items", items)

		w.Header().Set("Content/Type", "application/json")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(items)
	}
}
