package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"log"
	"os"
	"strings"
	"time"
)

func Validate(jwt string, tokenType string) (bool, int) {
	var userID int
	var secret string
	if len(jwt) < 3 {
		return false, 0
	}

	jwt = strings.TrimPrefix(jwt, "Bearer ")

	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")
	headerStringEncoded := tokens[0]
	payloadStringEncoded := tokens[1]
	signatureStringEncoded := tokens[2]
	var payload Payload
	var header Header

	signatureString, err := encoder.DecodeString(signatureStringEncoded)
	if err != nil {
		log.Println(err)
	}

	headerString, err := encoder.DecodeString(headerStringEncoded)
	if err != nil {
		log.Println(err)
	}

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
	}

	payloadDecoded := []byte(payloadString)
	headerDecoded := []byte(headerString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(headerDecoded, &header)
	if err != nil {
		log.Println(err)
	}

	if header.Alg == "HS256" {
		if payload.Expiration < time.Now().UnixMilli() { //token expired
			userID = 0
			return false, userID
		} else {
			if payload.JWTID != nil {
				/*
					if JWT ID exist, it means it is a session token
				*/
				secret = os.Getenv("JWT_SESSION_SECRET")
			} else {
				/*
					if JWT ID DOES NOT exist, it means it is an auth token
				*/
				secret = os.Getenv("JWT_AUTH_SECRET")
			}

			userID = payload.UserID
			signatureCheck := []byte(headerStringEncoded + "." + payloadStringEncoded)
			hmacNew := hmac.New(sha256.New, []byte(secret))
			hmacNew.Write(signatureCheck)
			signatureCheck = hmacNew.Sum(nil)
			isValid := hmac.Equal(signatureCheck, signatureString)
			return isValid, userID
		}

	} else { //wrong algo
		userID = 0
		return false, userID
	}
}
