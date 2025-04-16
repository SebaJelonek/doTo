package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type Item struct {
	Item string `json:"item"`
}

func AddItem(dbConnection *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var item Item

		err := json.NewDecoder(r.Body).Decode(&item)
		if err != nil {
			http.Error(w, "Error while decoding json", 500)
			log.Println("json decoding error: ", err)
			return
		}
		defer r.Body.Close()

		_, err = dbConnection.Exec("INSERT INTO items (name) VALUES ($1)", item.Item)
		if err != nil {
			http.Error(w, "Failed to insert data", 500)
			log.Println("db query error: ", err)
			return
		}

		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "item added",
		})

	}
}
