/*
SMTP Server: smtp.mail.com
Port: 587 (TLS) or 465 (SSL)
Username: Your full email address (do2@engineer.com)
Password: Your mail.com account password
*/
package handlers

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
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

// sendEmailTLS - for port 587 (STARTTLS)
func SendVerificationEmail(email string, token string) error {
	var msg = Message{
		To:      []string{email},
		Subject: "Verify Your do2 App Account",
		Body: fmt.Sprintf(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Verify Your do2 App Account</title>
		</head>
		<body style="margin:0;padding:0;font-family:Arial,sans-serif;color:#333333;background-color:#f5f5f5;">
			<!--[if (gte mso 9)|(IE)]>
			<table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
			<tr>
			<td>
			<![endif]-->
			<table align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%%;max-width:600px;background-color:#ffffff;margin:20px auto;">
				<!-- Header -->
				<tr>
					<td align="center" style="padding:30px 20px;background-color:#2563eb;color:#ffffff;font-size:24px;font-weight:bold;border-radius:8px 8px 0 0;">
						Welcome to do2 App!
					</td>
				</tr>			
				<!-- Body Content -->
				<tr>
					<td style="padding:30px 20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
						<p style="margin:0 0 20px 0;">Hello there,</p>					
						<p style="margin:0 0 20px 0;">Thank you for signing up for <strong>do2 App</strong> - a showcase of my skills in modern web development using React with TypeScript and Golang backend.</p>					
						<!-- Verification Box -->
						<table width="100%%" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0;background-color:#f3f4f6;border-radius:6px;">
							<tr>
								<td style="padding:20px;text-align:center;">
									<p style="margin:0 0 15px 0;">To start using the app, please verify your email:</p>
									<!--[if mso]>
									<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{verification_link}}" style="height:42px;v-text-anchor:middle;width:200px;" arcsize="6%%" strokecolor="#2563eb" fillcolor="#2563eb">
										<w:anchorlock/>
										<center style="color:#ffffff;font-family:Arial,sans-serif;font-weight:bold;">Verify My Email</center>
									</v:roundrect>
									<![else]-->
									<a href="localhost:3000/verify?token=%s" style="display:inline-block;padding:12px 24px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">Verify My Email</a>
									<!--[endif]-->
									<p style="margin:15px 0 0 0;font-size:13px;">This link expires in 24 hours</p>
								</td>
							</tr>
						</table>					
						<p style="margin:0 0 15px 0;"><strong>Important:</strong> Your account will be temporarily blocked if not verified within 24 hours.</p>					
						<p style="margin:0 0 20px 0;">I'd love to hear your feedback about the app!</p>					
						<p style="margin:0 0 20px 0;">Reply to this email if you have questions or suggestions.</p>					
						<p style="margin:0;">Happy exploring!</p>
					</td>
				</tr>			
				<!-- Footer -->
				<tr>
					<td align="center" style="padding:20px 0 0 0;font-size:13px;color:#6b7280;">
						<p style="margin:0 0 5px 0;">Best regards,</p>
						<p style="margin:0 0 10px 0;font-weight:bold;">Sebastian Jelonek</p>
						<p style="margin:0;">Automated message</p>
					</td>
				</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
		</body>
		</html>`, token),
	}
	var pass = os.Getenv("EMAIL_PASSWORD")
	var brevo = EmailConfig{
		SMTPHost: "smtp-relay.brevo.com",
		SMTPPort: "587",
		Email:    "8f6f36001@smtp-brevo.com",
		Password: pass,
	}

	auth := smtp.PlainAuth("", brevo.Email, brevo.Password, brevo.SMTPHost)

	to := strings.Join(msg.To, ",")
	message := fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nSubject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n%s",
		"do2@engineer.com", to, msg.Subject, msg.Body)

	err := smtp.SendMail(
		brevo.SMTPHost+":"+brevo.SMTPPort,
		auth,
		brevo.Email,
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
