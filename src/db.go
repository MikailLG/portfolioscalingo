package src

import (
	"database/sql"
	"log"
	"os"
)

func GetDB() *sql.DB {
	databaseURL := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("Connexion DB échouée :", err)
	}
	return db
}

func TodoStatus(db *sql.DB, id int) error {
	_, err := db.Exec("UPDATE todo SET completed = NOT completed WHERE id = ?", id)
	return err
}

func AjoutTodo(db *sql.DB, task string) error {
	_, err := db.Exec("INSERT INTO todo (task, completed) VALUES (?, false)", task)
	return err
}

func SuppresionTodo(db *sql.DB, id int) error {
	_, err := db.Exec("DELETE FROM todo WHERE id = ?", id)
	return err
}
