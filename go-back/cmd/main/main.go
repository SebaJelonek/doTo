package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/SebaJelonek/doTo/internals/server"
	_ "github.com/lib/pq" // PostgreSQL driver
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "hn5trc6e"
	dbname   = "postgres"
)

func main() {
	server.StartServer()
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
	defer db.Close()

	// Simple query example
	rows, err := db.Query("SELECT id, name FROM users")
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
}

// func Solve(s string) string {
// 	s range
// }
