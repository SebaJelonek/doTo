package tasks

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type DoneTask struct {
	ID     int  `json:"id"`
	IsDone bool `json:"checked"`
}

func CompleteTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var task DoneTask

		err := json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, "Wrong JSON format", 422)
			log.Println("error: ", err)
			return
		}
		defer r.Body.Close()
		log.Println(task)
		if task.IsDone {
			completionTime := time.Now().UnixMilli()

			result, err := dbConnection.Exec(
				"UPDATE tasks SET is_done = $2, completion_time = $3 WHERE id = ($1)",
				task.ID, task.IsDone, completionTime)

			if err != nil {
				http.Error(w, "db error", 500)
				log.Println("error: ", err)
				return
			}
			log.Println(result)

			w.WriteHeader(200)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Task has been marked complete",
			})
			return
		} else {
			result, err := dbConnection.Exec(
				"UPDATE tasks SET is_done = $2, completion_time = $3 WHERE id = ($1)",
				task.ID, task.IsDone, nil)
			if err != nil {
				http.Error(w, "db error", 500)
				log.Println("error: ", err)
				return
			}
			log.Println(result)

			w.WriteHeader(202)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Task has been marked uncomplete",
			})
			return
		}

		//TODO
		//add that completion may be done only by owner
		//add deadline update
	}
}
