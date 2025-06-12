package tasks

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	jwt "github.com/SebaJelonek/doTo/internals/jwt"
)

func GetTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tasks []Task
		var userID int
		authToken := r.Header.Get("Authorization")
		sessionToken, err := r.Cookie("jwt")

		if err != nil {
			log.Println("session is not there")
			http.Error(w, "Session expired please log in", 403)
		}

		if len(authToken) > 3 {
			userID = jwt.Decode(authToken)
			log.Println("authToken", authToken)
		} else {
			userID = jwt.Decode(sessionToken.Value)
		}

		rows, err := dbConnection.Query(`
		SELECT 
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
		WHERE t.creator = $1 OR t.owner = $1;`,
			userID)

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

		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(tasks)

	}

}
