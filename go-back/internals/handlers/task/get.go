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
		rows, err := dbConnection.Query(`SELECT 
		t.id,
		t.name,
		t.is_done,
		t.is_deleted,
		t.start_time,
		t.completion_time,
		t.dead_line,
		t.priority,
		uc.name AS creator_name,
		uo.name AS owner_name
	  FROM tasks t
	  INNER JOIN users uc ON t.creator = uc.id
	  INNER JOIN users uo ON t.owner = uo.id
	  WHERE t.creator = $1 AND t.owner = $1;
	  `, authToken)
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
				&task.Name,
				&task.IsDone,
				&task.IsDeleted,
				&task.StartTime,
				&task.CompletionTime,
				&task.DeadLine,
				&task.Priority,
				&task.Creator,
				&task.Owner,
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
