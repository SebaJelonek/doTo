/*
SMTP Server: smtp.mail.com
Port: 587 (TLS) or 465 (SSL)
Username: Your full email address (do2@engineer.com)
Password: Your mail.com account password
*/
package handlers

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/smtp"
	"strings"
)

type EmailConfig struct {
	SMTPHost string
	SMTPPort string
	Email    string
	Password string
}

type Message struct {
	To      []string
	Subject string
	Body    string
}

// SendEmail - works with both port 587 (STARTTLS) and 465 (SSL)
func SendEmail(config EmailConfig, msg Message) error {
	if config.SMTPPort == "465" {
		return sendEmailSSL(config, msg)
	}
	return sendEmailTLS(config, msg)
}

// sendEmailTLS - for port 587 (STARTTLS)
func sendEmailTLS(config EmailConfig, msg Message) error {
	auth := smtp.PlainAuth("", config.Email, config.Password, config.SMTPHost)

	to := strings.Join(msg.To, ",")
	message := fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nSubject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s",
		"do2@engineer.com", to, msg.Subject, msg.Body)

	err := smtp.SendMail(
		config.SMTPHost+":"+config.SMTPPort,
		auth,
		config.Email,
		msg.To,
		[]byte(message),
	)

	if err != nil {
		log.Printf("Error sending email via TLS: %v", err)
		return err
	}

	log.Println("Email sent successfully via TLS")
	return nil
}

// sendEmailSSL - for port 465 (SSL)
func sendEmailSSL(config EmailConfig, msg Message) error {
	// Create SSL connection
	tlsConfig := &tls.Config{
		InsecureSkipVerify: false,
		ServerName:         config.SMTPHost,
	}

	conn, err := tls.Dial("tcp", config.SMTPHost+":"+config.SMTPPort, tlsConfig)
	if err != nil {
		log.Printf("Error creating SSL connection: %v", err)
		return err
	}
	defer conn.Close()

	// Create SMTP client from SSL connection
	client, err := smtp.NewClient(conn, config.SMTPHost)
	if err != nil {
		log.Printf("Error creating SMTP client: %v", err)
		return err
	}
	defer client.Close()

	// Authenticate
	auth := smtp.PlainAuth("", config.Email, config.Password, config.SMTPHost)
	if err = client.Auth(auth); err != nil {
		log.Printf("Error authenticating: %v", err)
		return err
	}

	// Set sender
	if err = client.Mail(config.Email); err != nil {
		log.Printf("Error setting sender: %v", err)
		return err
	}

	// Set recipients
	for _, addr := range msg.To {
		if err = client.Rcpt(addr); err != nil {
			log.Printf("Error setting recipient %s: %v", addr, err)
			return err
		}
	}

	// Send message
	writer, err := client.Data()
	if err != nil {
		log.Printf("Error getting data writer: %v", err)
		return err
	}

	message := fmt.Sprintf("To: %s\r\nSubject: %s\r\n\r\n%s",
		strings.Join(msg.To, ","), msg.Subject, msg.Body)

	_, err = writer.Write([]byte(message))
	if err != nil {
		log.Printf("Error writing message: %v", err)
		return err
	}

	err = writer.Close()
	if err != nil {
		log.Printf("Error closing writer: %v", err)
		return err
	}

	log.Println("Email sent successfully via SSL")
	return nil
}
