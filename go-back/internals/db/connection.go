package connection

import (
	"database/sql"
	"fmt"
	"log"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "hn5trc6e"
	dbname   = "DoToDB"
)

var DB *sql.DB

func CreateConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	log.Println(psqlInfo)
	// Supabase connection string
	// connStr := os.Getenv("DATABASE_URI")

	// Connect to the database
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	DB = db
	return DB
}
