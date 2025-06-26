package handlers

import "net/http"

func Favicon(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/favicon.ico") // Adjust "static/favicon.ico" to your file's path
}
