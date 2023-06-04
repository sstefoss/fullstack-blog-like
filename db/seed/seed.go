package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

type Post struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

func main() {
	// Make the HTTP GET request
	response, err := http.Get("https://jsonplaceholder.typicode.com/posts")
	if err != nil {
		fmt.Printf("Failed to fetch posts: %v\n", err)
		return
	}
	defer response.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("Failed to read response body: %v\n", err)
		return
	}

	// Parse the JSON response
	var posts []Post
	err = json.Unmarshal(body, &posts)
	if err != nil {
		fmt.Printf("Failed to parse JSON: %v\n", err)
		return
	}

	// Open a database connection
	dsn := fmt.Sprintf("%s?sslmode=disable", os.Getenv("PG_DATABASE_URL"))
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		fmt.Printf("Failed to connect to the database: %v\n", err)
		return
	}
	defer db.Close()

	// Insert the posts into the database
	for _, post := range posts {
		_, err = db.Exec("INSERT INTO \"posts\" (\"title\", \"body\") VALUES ($1, $2)", post.Title, post.Body)
		if err != nil {
			fmt.Printf("Failed to insert post #%d: %v\n", post.ID, err)
		}
	}

	fmt.Println("DB seed finished!")
}
