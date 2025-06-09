package jwt

type Payload struct {
	UserID     int   `json:"uid"`
	IssuedAt   int64 `json:"iat"`
	Expiration int64 `json:"exp"`
	JWTID      *int  `json:"jti,omitempty"`
}

type Header struct {
	Alg  string `json:"alg"`
	Type string `json:"typ"`
}

func GetHeader() Header {
	var header = Header{
		Alg:  "HS256",
		Type: "JWT",
	}
	return header
}
