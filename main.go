package main

import (
	"database/sql"
	"log"
	"os"
	"portfolio/src/controller"
	"portfolio/src/router"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	port := os.Getenv("PORT")
	host := os.Getenv("HOST")
	log.Printf("Démarrage sur %s:%s", host, port)
	controller.InitTemps()
	router.InitServ()
}

func GetDB() *sql.DB {
	databaseURL := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
