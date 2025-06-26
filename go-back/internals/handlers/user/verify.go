package users

import (
	"database/sql"
	"log"
	"net/http"
)

func Verify(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.URL.Query().Get("token")
		var userName string
		log.Println(token)
		err := dbConnection.QueryRow("UPDATE users SET verified = true WHERE token = $1 RETURNING name", token).Scan(&userName)
		if err != nil {
			log.Println("query update error", err)
			http.Error(w, "Verification failed", 500)
			return
		}
		w.Header().Add("Content-Type", "text/html; charset=utf-8")

		siteContent := `<!DOCTYPE html>
			<html>
			<head>
			    <title>Verification Successful!</title>
				<meta http-equiv="refresh" content="5;url=http://localhost:5173/" />
			    <style>
			        body {
			            font-family: Arial, sans-serif;
			            background-color: #f4f4f4;
			            color: #333;
			            line-height: 1.6;
			            margin: 0;
			            padding: 20px;
			            display: flex;
			            justify-content: center;
			            align-items: center;
			            min-height: 100vh;
			        }
			        .container {
			            background-color: #fff;
			            padding: 40px;
			            border-radius: 8px;
			            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			            max-width: 600px;
			            text-align: center;
			        }
			        h1 {
			            color: #28a745; // A pleasant green for success
			            margin-bottom: 20px;
			        }
			        p {
			            margin-bottom: 15px;
			        }
			        .contact-link {
			            color: #007bff; // Standard blue for links
			            text-decoration: none;
			            font-weight: bold;
			        }
			        .contact-link:hover {
			            text-decoration: underline;
			        }
			    </style>
			</head>
			<body>
			    <div class="container">
			        <h1>Hi ` + userName + `!</h1>
			        <p>Thank you for verifying your account. You can now use the site fully without any blockers or restrictions.</p>
			        <p>If you have any questions or need assistance, please don't hesitate to reach out to us <a href="mailto:do2@engineer.com" class="contact-link">here</a>.</p>
			        <p>We're thrilled to have you onboard!</p>
					<p>You are now going to be redirected to the <strong>Do2 App</strong></p>
			    </div>
			</body>
			</html>`
		w.Write([]byte(siteContent))
	}
}
