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
	middleware "github.com/SebaJelonek/doTo/internals/middleware"
	"github.com/joho/godotenv"
)

func StartServer(dbConnection *sql.DB) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file ")
		log.Println(err)
	}

	pass := os.Getenv("EMAIL_PASSWORD")
	brevo := handlers.EmailConfig{SMTPHost: "smtp-relay.brevo.com", SMTPPort: "587", Email: "8f6f36001@smtp-brevo.com", Password: pass}
	err = handlers.SendEmail(
		brevo,
		handlers.Message{To: []string{"artur.charatynowicz.carfree@gmail.com", "do2@engineer.com", "hubabubakuba@interia.eu"}, Subject: "test", Body: "no co tam doktorku?"})
	if err != nil {
		log.Println(err)
	}
	http.HandleFunc("/api/add-item", middleware.Cors(middleware.Auth(dbConnection, handlers.AddItem(dbConnection))))
	http.HandleFunc("/api/tasks", middleware.Cors(middleware.Auth(dbConnection, tasks.GetTask(dbConnection))))
	http.HandleFunc("/api/task", middleware.Cors(middleware.Auth(dbConnection, tasks.AddTask(dbConnection))))             //create task
	http.HandleFunc("/api/finish-task", middleware.Cors(middleware.Auth(dbConnection, tasks.CompleteTask(dbConnection)))) //complete task
	http.HandleFunc("/api/login", middleware.Cors(middleware.Auth(dbConnection, users.LoginUser(dbConnection))))
	http.HandleFunc("/api/user", middleware.Cors(middleware.Auth(dbConnection, users.AddUser(dbConnection))))
	http.HandleFunc("/api/delete-task", middleware.Cors(middleware.Auth(dbConnection, tasks.DeleteTask(dbConnection)))) //delete task

	//always last
	http.HandleFunc("/", middleware.Cors(middleware.Auth(dbConnection, handlers.Root(dbConnection))))

	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)

}
