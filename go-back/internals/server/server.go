package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func StartServer(dbConnection *sql.DB) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	rows, err := dbConnection.Query("SELECT id, name FROM users")
	if err != nil {
		log.Fatalf("Query failed: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&id, &name); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		log.Printf("Row: ID=%d, Name=%s", id, name)
	}

	port := os.Getenv("PORT")
	fmt.Printf("starting server at port: %v\n", port)
	http.ListenAndServe(":"+port, nil)

}
