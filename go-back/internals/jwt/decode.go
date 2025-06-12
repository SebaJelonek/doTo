package jwt

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"strings"
)

func Decode(jwt string) int {
	if len(jwt) < 3 {
		return 0
	}
	var userID int
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")

	payloadStringEncoded := tokens[1]
	var payload Payload

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
	}

	payloadDecoded := []byte(payloadString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
	}

	userID = payload.UserID

	return userID

}
