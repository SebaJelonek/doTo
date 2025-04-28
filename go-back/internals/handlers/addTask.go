package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type Task struct {
	Creator        int       `json:"creator"`
	Owner          int       `json:"owner"`
	DeadLine       time.Time `json:"deadline"`
	StartTime      time.Time `json:"startTime"`
	CompletionTime time.Time `json:"completionTime"`
	IsDone         bool      `json:"isDone"`
	IsDeleted      bool      `json:"isDeleted"`
	Name           string    `json:"name"`
}

type NewTask struct {
	Creator  int       `json:"creator"`
	Owner    int       `json:"owner"`
	Name     string    `json:"name"`
	Priority string    `json:"priority"`
	DeadLine time.Time `json:"deadline"`
}

func AddTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		method := r.Method
		if method == "POST" {

			var task NewTask

			err := json.NewDecoder(r.Body).Decode(&task)
			if err != nil {
				http.Error(w, "Wrong JSON format", 422)
				log.Println("json error: ", err)
				return
			}

			defer r.Body.Close()

			result, err := dbConnection.Exec("INSERT INTO tasks (creator, owner, labels, name, deadline) values ($1, $2, $3, $4, $5)",
				task.Creator, task.Owner, task.Name, task.Priority, task.DeadLine)
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
		// else if method == "GET" {
		// 	var tasks []NewTask
		// 	jwt, err := r.Cookie("auth_token")
		// 	if err != nil {
		// 		http.Error(w, "Unauthorized", 401)
		// 		log.Println("error: ", err)
		// 		return
		// 	}

		// 	userID, err := validateAndExtractUserID(jwt)
		// 	if err != nil {
		// 		http.Error(w, "Unauthorized", 401)
		// 		log.Println("error: ", err)
		// 		return
		// 	}
		// 	log.Println("use of tasks and userID", tasks, userID)

		// }

	}
}

//TODO
//add deadline feature
