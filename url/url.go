package url

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/url"
	"strconv"
	"time"

	"menteslibres.net/gosexy/redis"
)

const (
	size    = 5
	symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+"
)

// A URL represents a model to save the new short URL and Original URL.
type URL struct {
	ID        string    `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Destiny   string    `json:"destiny"`
}

// A Stats represents the statistics. How many clicks by URL
type Stats struct {
	URL    *URL `json:"url"`
	Clicks int  `json:"clicks"`
}

var client *redis.Client

func init() {
	rand.Seed(time.Now().UnixNano())
	client = redis.New()
	err := client.Connect("localhost", 6379)
	if err != nil {
		log.Fatalf("Connect failed: %s\n", err.Error())
		return
	}

	log.Println("Connected to redis-server.")
}

// SaveClick saves a incremeted click value for one URL
func SaveClick(id string) {
	clicks := FindClickByID(id)
	clicks++
	jsonClicks, _ := json.Marshal(clicks)
	client.Set("clicks_"+id, jsonClicks)
}

// FindClickByID returns the clicks quantity has one URL
func FindClickByID(id string) int {
	clicksJSON, _ := client.Get("clicks_" + id)
	clicks, _ := strconv.Atoi(clicksJSON)
	return clicks
}

// List returns all shorted URLs
func List() []*Stats {
	ids, _ := client.HKeys("urls")
	returnURL := make([]*Stats, len(ids))
	for _, id := range ids {
		url := FindByID(id)
		returnURL = append(returnURL, url.Stats())
	}
	return clean(returnURL)
}

func clean(s []*Stats) []*Stats {
	var r []*Stats
	for _, str := range s {
		if str != nil {
			r = append(r, str)
		}
	}
	return r
}

// FindORCreateURL returns a URL if it exists or create a new one
func FindORCreateURL(destiny string) (u *URL, nova bool, err error) {
	if u = FindByURL(destiny); u != nil {
		return u, false, nil
	}

	if _, err = url.ParseRequestURI(destiny); err != nil {
		return nil, false, err
	}

	url := URL{makeID(), time.Now(), destiny}
	urlJSON, _ := json.Marshal(url)
	client.HSet("urls", url.ID, []byte(urlJSON))
	return &url, true, nil
}

// FindByURL returns a URL by a url Origin
func FindByURL(urlDestiny string) *URL {
	ids, _ := client.HKeys("urls")
	for _, id := range ids {
		url := FindByID(id)
		if url.Destiny == urlDestiny {
			return url
		}
	}
	return nil
}

// FindByID returns a URL by its ID
func FindByID(id string) *URL {
	jsonURL, _ := client.HGet("urls", id)
	return decodeURL([]byte(jsonURL))
}

func decodeURL(jsonURL []byte) *URL {
	var url *URL

	err := json.Unmarshal(jsonURL, &url)

	if err != nil {
		fmt.Println("error:", err)
	}
	return url
}

// Stats returns statistics from a URL
func (u *URL) Stats() *Stats {
	return &Stats{u, FindClickByID(u.ID)}
}

func makeID() string {
	newID := func() string {
		id := make([]byte, size, size)
		for i := range id {
			id[i] = symbols[rand.Intn(len(symbols))]
		}
		return string(id)
	}

	for {
		if id := newID(); !isThereID(id) {
			return id
		}
	}
}

func isThereID(id string) bool {
	url := FindByURL(id)
	return url != nil
}
