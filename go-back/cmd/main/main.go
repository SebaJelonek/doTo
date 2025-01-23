package main

import (
	connection "github.com/SebaJelonek/doTo/internals/db"
	"github.com/SebaJelonek/doTo/internals/server"
	_ "github.com/lib/pq" // PostgreSQL driver
)

func main() {
	dbConnection := connection.CreateConnection()
	defer dbConnection.Close()

	server.StartServer(dbConnection)
}

// const (
// 	host     = "localhost"
// 	port     = 5432
// 	user     = "postgres"
// 	password = "hn5trc6e"
// 	dbname   = "postgres"
// )
// psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
// 		host, port, user, password, dbname)

// 	// Supabase connection string
// 	// connStr := "user=postgres.qfwtgjlwfgejsphowsxv password=hn5trc6eFG%25 host=aws-0-eu-central-1.pooler.supabase.com port=5432 dbname=postgres sslmode=require"
// 	// "postgresql://postgres.qfwtgjlwfgejsphowsxv:TjF3tttXs3qooYuN@aws-0-eu-central-1.pooler.supabase.com:6543"
// 	log.Printf("we are trying to connect to db")
// 	// Connect to the database
// 	db, err := sql.Open("postgres", psqlInfo)
// 	if err != nil {
// 		log.Fatalf("Unable to connect to database: %v", err)
// 	}
// 	defer db.Close()
// 	log.Printf("we are in db now")
// 	// Simple query example
// 	rows, err := db.Query("SELECT id, name FROM users")
// 	if err != nil {
// 		log.Fatalf("Query failed: %v", err)
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		var id int
// 		var name string
// 		if err := rows.Scan(&id, &name); err != nil {
// 			log.Println("Error scanning row:", err)
// 			continue
// 		}
// 		log.Printf("Row: ID=%d, Name=%s", id, name)
// 	}
