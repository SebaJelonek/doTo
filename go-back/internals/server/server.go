package server

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/SebaJelonek/doTo/internals/handlers"
	"github.com/joho/godotenv"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func StartServer(dbConnection *sql.DB) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	http.HandleFunc("/", handlers.Root(dbConnection))
	http.HandleFunc("/api/add-user", handlers.AddUser(dbConnection))

	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)

}
