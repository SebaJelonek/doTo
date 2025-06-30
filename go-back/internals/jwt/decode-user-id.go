package jwt

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"strings"
)

func DecodeUserID(jwt string) int {
	var userID int
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")
	if len(tokens) < 3 {
		return 0
	}
	payloadStringEncoded := tokens[1]
	var payload Payload

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println("jwt - decode - json", err)
		return 0
	}

	payloadDecoded := []byte(payloadString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {

		log.Println("jwt - decode - json", err)
		return 0
	}

	userID = payload.UserID

	return userID

}
