package connection

import (
	"database/sql"
	"log"
	"os"
)

var DB *sql.DB

func CreateConnection() *sql.DB {
	// Supabase connection string
	connStr := os.Getenv("DATABASE_URI")

	// Connect to the database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	DB = db
	return DB
}
