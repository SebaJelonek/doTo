package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"log"
	"os"
)

func Generate(header Header, payload Payload, tokenType string) string {
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	var secret string
	if tokenType == "auth" {
		secret = os.Getenv("JWT_AUTH_SECRET")
	} else if tokenType == "session" {
		secret = os.Getenv("JWT_SESSION_SECRET")
	}

	jsonHeader, err := json.Marshal(header)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	log.Println("generate, why?", tokenType)

	jsonWebHeader := encoder.EncodeToString(jsonHeader)
	jsonWebPayload := encoder.EncodeToString(jsonPayload)

	jw := jsonWebHeader + "." + jsonWebPayload

	hmac := hmac.New(sha256.New, []byte(secret))
	hmac.Write([]byte(jw))

	jwHashed := hmac.Sum(nil)

	jwt := jw + "." + encoder.EncodeToString(jwHashed)
	return jwt
}
