package server

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func StartServer() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)
}
