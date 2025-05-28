package tasks

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func GetTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tasks []Task

		authToken := r.Header.Get("Authorization")
		log.Println("this is auth token: ", authToken)
		/*
			parsing jwt logic and checking if auth token is correct/expired etc.

			userID, err := jwtParser(authToken)
		*/

		authToken = "1"
		rows, err := dbConnection.Query("SELECT * FROM tasks WHERE creator = $1 AND owner = $1", authToken)
		if err != nil {
			http.Error(w, "Query failed", 500)
			log.Println("query error ", err)
		}

		defer rows.Close()

		for rows.Next() {
			var task Task
			/*
				query owner for each task
				and assert it into the task

				so below we will not scan the owner because its int
				we will scan the ownerName in here and assert it to task
				afterwards we assert everything else
				and me it its own function
			*/
			err := rows.Scan(
				&task.Id,
				&task.Creator,
				&task.Owner,
				&task.IsDone,
				&task.IsDeleted,
				&task.StartTime,
				&task.CompletionTime,
				&task.Name,
				&task.DeadLine,
				&task.Priority,
			)
			if err != nil {
				log.Println("scan error ", err)
				return
			}
			tasks = append(tasks, task)
			log.Println(tasks)
		}

		w.WriteHeader(200)
		json.NewEncoder(w).Encode(tasks)

	}

}
