package controller

import (
	"html/template"
	"net/http"
)

var Temp *template.Template

func InitTemps() {
	Temp = template.Must(template.ParseGlob("./src/temp/*.html"))
}
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	Temp.ExecuteTemplate(w, "index.html", nil)
}
