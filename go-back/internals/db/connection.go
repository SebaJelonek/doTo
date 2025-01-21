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
	dbname   = "postgres"
)

var DB *sql.DB

func CreateConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	// Supabase connection string
	// connStr := "user=postgres.qfwtgjlwfgejsphowsxv password=hn5trc6eFG%25 host=aws-0-eu-central-1.pooler.supabase.com port=5432 dbname=postgres sslmode=require"
	//"postgresql://postgres.qfwtgjlwfgejsphowsxv:TjF3tttXs3qooYuN@aws-0-eu-central-1.pooler.supabase.com:6543"

	// Connect to the database
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	DB = db
	return DB
}
