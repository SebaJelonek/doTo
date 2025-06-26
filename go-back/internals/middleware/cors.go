package middleware

import "net/http"

func Cors(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		println("🟢 CorsHandler running for:", r.URL.Path)
		println("🟢 CorsHandler running for url:", r.URL)

		w.Header().Set("Access-Control-Allow-Origin", "https://doto-1eqh.onrender.com")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Expose-Headers", "Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(200)
			return
		}
		handler(w, r)
	}
}
