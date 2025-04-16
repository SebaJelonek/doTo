package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type NewTask struct {
	Creator  string    `json:"creator"`
	Owner    string    `json:"owner"`
	Labels   []string  `json:"labels"`
	Name     string    `json:"name"`
	DeadLine time.Time `json:"deadline"`
}

func AddTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var task NewTask

		err := json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, "Wrong JSON format", 422)
			log.Println("json error: ", err)
			return
		}

		defer r.Body.Close()

		result, err := dbConnection.Exec("INSERT INTO tasks (creator, owner, labels, name, deadline) values ($1, $2, $3, $4, $5)",
			task.Creator, task.Owner, task.Labels, task.Name, task.DeadLine)
		if err != nil {
			http.Error(w, "Query to DB failed", 500)
			log.Println("error: ", err)
			return
		}

		affected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "no rows affected", 500)
			log.Println("error: ", err)
			return
		}

		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]string{
			"message":       "Task added successfully",
			"rows_affected": fmt.Sprintf("%d", affected), // convert int64 to string
		})
	}
}

//TODO
//add deadline feature
