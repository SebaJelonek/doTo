package main

import (
	connection "github.com/SebaJelonek/doTo/internals/db"
	"github.com/SebaJelonek/doTo/internals/server"
	_ "github.com/lib/pq" // PostgreSQL driver
)

/*
SMTP Server: smtp.mail.com
Port: 587 (TLS) or 465 (SSL)
Username: Your full email address (do2.engineer@mail.com)
Password: Your mail.com account password
*/
func main() {
	dbConnection := connection.CreateConnection()
	defer dbConnection.Close()

	server.StartServer(dbConnection)
}
