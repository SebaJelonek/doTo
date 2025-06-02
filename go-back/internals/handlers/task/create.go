package tasks

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type Task struct {
	Id             int    `json:"id"`
	Creator        string `json:"creator"`
	Owner          string `json:"owner"`
	DeadLine       int    `json:"deadline"`
	StartTime      int    `json:"startTime"`
	CompletionTime int    `json:"completionTime"`
	IsDone         bool   `json:"isChecked"`
	IsDeleted      bool   `json:"isDeleted"`
	Name           string `json:"task"`
	Priority       string `json:"priority"`
}

type NewTask struct {
	Creator  int    `json:"creatorID"`
	Owner    string `json:"owner"`
	Name     string `json:"task"`
	Priority string `json:"priority"`
	DeadLine int    `json:"deadline"`
}

func AddTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var method string = r.Method

		// method := r.Method
		if method == "POST" {
			var task NewTask

			err := json.NewDecoder(r.Body).Decode(&task)
			if err != nil {
				http.Error(w, "Wrong JSON format", 422)
				log.Println("json error: ", err)
				return
			}

			defer r.Body.Close()

			var ownerID int
			if err := dbConnection.QueryRow("SELECT id FROM users WHERE name ILIKE $1", task.Owner).Scan(&ownerID); err != nil {
				if err == sql.ErrNoRows {
					http.Error(w, "This user does not exist", 404)
					log.Println("No user found with name: ", task.Owner)
				} else {
					http.Error(w, "Error while querying owner ID", 500)
					log.Println("DB error:", err)
				}
				return
			}
			log.Println(ownerID)
			result, err := dbConnection.Exec("INSERT INTO tasks (creator, owner, start_time, name, dead_line, priority) VALUES ($1, $2, $3, $4, $5, $6)", task.Creator, ownerID, time.Now().Local().UnixMilli(), task.Name, task.DeadLine, task.Priority)
			if err != nil {
				http.Error(w, "Query to DB failed", 500)
				log.Println("INSERT error: ", err)
				return
			}

			affected, err := result.RowsAffected()
			if err != nil {
				http.Error(w, "no rows affected", 500)
				log.Println("AFFECTED error: ", err)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(200)
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
