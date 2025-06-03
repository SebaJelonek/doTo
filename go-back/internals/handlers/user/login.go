package users

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

	"golang.org/x/crypto/bcrypt"
)

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Password string
}

type Header struct {
	Alg  string `json:"alg"`
	Type string `json:"typ"`
}

type Payload struct {
	UserID     int   `json:"userId"`
	Expiration int64 `json:"exp"`
}

func LoginUser(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var userLogin UserLogin
		var user User
		err := json.NewDecoder(r.Body).Decode(&userLogin)
		if err != nil {
			http.Error(w, "Json error", 422)
			log.Println("Json error ", err)
			return
		}

		err = dbConnection.QueryRow("SELECT id, name, password FROM users WHERE email ILIKE $1", userLogin.Email).Scan(&user.ID, &user.Name, &user.Password)
		if err != nil {
			if strings.Contains(err.Error(), "no rows") {
				http.Error(w, "This email does not exist", 404)
				return
			} else {
				http.Error(w, "Error", 500)
				log.Println("Query error", err)
				return

			}
		}

		isCorrect := CheckPassword(userLogin.Password, user.Password)

		if isCorrect {
			header := Header{
				Alg:  "HS256",
				Type: "JWT",
			}
			payload := Payload{
				UserID:     user.ID,
				Expiration: time.Now().UnixMilli() + 60000,
			}

			jwt := GenerateJWT(header, payload)
			log.Println(jwt)

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(200)
			json.NewEncoder(w).Encode(map[string]any{
				"id":   user.ID,
				"name": user.Name,
			})
			return
		} else {
			http.Error(w, "Password do not match", 401)
			return
		}

	}

}

func CheckPassword(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func GenerateJWT(header Header, payload Payload) string {
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	secret := os.Getenv("SECRET")

	jsonHeader, err := json.Marshal(header)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	jsonWebHeader := encoder.EncodeToString(jsonHeader)
	jsonWebPayload := encoder.EncodeToString(jsonPayload)

	jw := jsonWebHeader + "." + jsonWebPayload

	hmac := hmac.New(sha256.New, []byte(secret))
	hmac.Write([]byte(jw))

	jwHashed := hmac.Sum(nil)

	jwt := jw + "." + encoder.EncodeToString(jwHashed)
	return jwt
}
