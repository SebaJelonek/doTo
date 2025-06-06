package tasks

import (
	"crypto/hmac"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	users "github.com/SebaJelonek/doTo/internals/handlers/user"
)

func ValidateJWT(jwt string, tokenType string) bool {
	secret := os.Getenv("JWT_SESSION_SECRET")

	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")
	headerStringEncoded := tokens[0]
	payloadStringEncoded := tokens[1]
	signatureStringEncoded := tokens[2]
	var payload users.Payload
	var header users.Header

	signatureString, err := encoder.DecodeString(signatureStringEncoded)
	if err != nil {
		log.Println(err)
	}

	headerString, err := encoder.DecodeString(headerStringEncoded)
	if err != nil {
		log.Println(err)
	}

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
	}
	payloadDecoded := []byte(payloadString)
	headerDecoded := []byte(headerString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(headerDecoded, &header)
	if err != nil {
		log.Println(err)
	}
	if header.Alg == "HS256" {
		if payload.Expiration < time.Now().UnixMilli() {
			return false
		} else {
			signatureCheck := []byte(headerStringEncoded + "." + payloadStringEncoded)
			hmacNew := hmac.New(sha256.New, []byte(secret))
			hmacNew.Write(signatureCheck)
			signatureCheck = hmacNew.Sum(nil)
			isValid := hmac.Equal(signatureCheck, signatureString)
			return isValid
		}

	} else {
		return false
	}
}

func GetTask(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tasks []Task

		authToken := r.Header.Get("Authorization")
		sessionToken, err := r.Cookie("jwt")
		if err != nil {
			log.Println(err)
		}
		log.Println("this is auth token:", authToken)
		log.Println("this is session token:", sessionToken)
		if sessionToken == nil {
			log.Println("token does not exist")
		} else {
			isValid := ValidateJWT(sessionToken.Value, "session")
			log.Println(isValid)
		}

		/*
			parsing jwt logic and checking if auth token is correct/expired etc.

			userID, err := jwtParser(authToken)
		*/

		authToken = "1"
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
		WHERE t.creator = $1 AND t.owner = $1;`,
			authToken)
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
