package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	handlers "github.com/SebaJelonek/doTo/internals/handlers"
	tasks "github.com/SebaJelonek/doTo/internals/handlers/task"
	users "github.com/SebaJelonek/doTo/internals/handlers/user"
	"github.com/joho/godotenv"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func StartServer(dbConnection *sql.DB) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file ")
		log.Println(err)
	}

	http.HandleFunc("/api/add-user", handlers.CorsHandler(users.AddUser(dbConnection)))
	http.HandleFunc("/api/add-item", handlers.CorsHandler(handlers.AddItem(dbConnection)))
	http.HandleFunc("/api/tasks", handlers.CorsHandler(tasks.GetTask(dbConnection)))
	http.HandleFunc("/api/task", handlers.CorsHandler(tasks.AddTask(dbConnection)))             //create task
	http.HandleFunc("/api/finish-task", handlers.CorsHandler(tasks.CompleteTask(dbConnection))) //complete task
	// http.HandleFunc("/api/delete-task", handlers.CorsHandler(tasks.DeleteTask(dbConnection)))//delete task

	//always last
	http.HandleFunc("/", handlers.CorsHandler(handlers.Root(dbConnection)))

	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)

}
