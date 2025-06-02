package tasks

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type DeletedTask struct {
	ID        int  `json:"id"`
	IsDeleted bool `json:"isDeleted"`
}

func DeleteTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var deletedTask DeletedTask

		json.NewDecoder(r.Body).Decode(&deletedTask)
		log.Println(deletedTask)
		result, err := dbConnection.Exec("UPDATE tasks SET is_deleted = $1 WHERE id = $2",
			deletedTask.IsDeleted, deletedTask.ID)
		if err != nil {
			http.Error(w, "Something went wrong", 500)
			log.Println("DB error:", err)
			return
		}
		log.Println(result)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Task has been deleted",
		})
	}
}
