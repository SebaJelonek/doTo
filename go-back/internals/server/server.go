package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	handlers "github.com/SebaJelonek/doTo/internals/handlers"
	"github.com/SebaJelonek/doTo/internals/handlers/items"
	tasks "github.com/SebaJelonek/doTo/internals/handlers/task"
	users "github.com/SebaJelonek/doTo/internals/handlers/user"
	middleware "github.com/SebaJelonek/doTo/internals/middleware"
	"github.com/joho/godotenv"
)

func StartServer(dbConnection *sql.DB) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file ")
		log.Println(err)
	}

	http.HandleFunc("/api/item", middleware.Cors(middleware.Auth(dbConnection, items.Create(dbConnection))))
	http.HandleFunc("/api/items", middleware.Cors(middleware.Auth(dbConnection, items.Get(dbConnection))))
	// http.HandleFunc("/api/delete", middleware.Cors(middleware.Auth(dbConnection, items.Get(dbConnection))))

	http.HandleFunc("/api/task", middleware.Cors(middleware.Auth(dbConnection, tasks.Create(dbConnection))))          //create task
	http.HandleFunc("/api/tasks", middleware.Cors(middleware.Auth(dbConnection, tasks.Get(dbConnection))))            //get tasks
	http.HandleFunc("/api/finish-task", middleware.Cors(middleware.Auth(dbConnection, tasks.Complete(dbConnection)))) //complete task
	http.HandleFunc("/api/delete-task", middleware.Cors(middleware.Auth(dbConnection, tasks.Delete(dbConnection))))   //delete task

	http.HandleFunc("/verify", middleware.Cors(users.Verify(dbConnection))) // verification site served with html
	http.HandleFunc("/api/login", middleware.Cors(users.Login(dbConnection)))
	http.HandleFunc("/api/user", middleware.Cors(users.Create(dbConnection)))
	http.HandleFunc("/api/session", middleware.Cors(middleware.Auth(dbConnection, users.Session(dbConnection))))

	http.HandleFunc("/favicon.ico", middleware.Cors(handlers.Favicon))

	//always last
	http.HandleFunc("/", middleware.Cors(middleware.Auth(dbConnection, handlers.Root(dbConnection))))

	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)

}
