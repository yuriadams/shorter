package url

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/url"
	"time"

	"github.com/monnand/goredis"
)

const (
	size    = 5
	symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+"
)

type URL struct {
	ID      string    `json:"id"`
	Criacao time.Time `json:"criacao"`
	Destino string    `json:"destino"`
}

type Stats struct {
	URL    *URL `json:"url"`
	Clicks int  `json:"clicks"`
}

var client goredis.Client

func init() {
	rand.Seed(time.Now().UnixNano())
	client.Addr = "127.0.0.1:6379"
}

func SaveClick(id string) {
	clicks := FindClickByID(id)
	clicks++
	jsonClicks, _ := json.Marshal(clicks)
	client.Hset("clicks", id, jsonClicks)
}

func FindClickByID(id string) int {
	var clicks int
	clicksJSON, _ := client.Hget("clicks", id)
	json.Unmarshal(clicksJSON, clicks)
	return clicks
}

func FindORCreateURL(destino string) (u *URL, nova bool, err error) {
	if u = FindByURL(destino); u != nil {
		return u, false, nil
	}

	if _, err = url.ParseRequestURI(destino); err != nil {
		return nil, false, err
	}

	url := URL{makeID(), time.Now(), destino}
	urlJSON, _ := json.Marshal(url)
	client.Hset("urls", url.ID, []byte(urlJSON))
	return &url, true, nil
}

func FindByURL(urlDestino string) *URL {
	urls, _ := client.Lrange("urls", 0, -1)

	for _, u := range urls {
		url := decodeURL(u)
		if url.Destino == urlDestino {
			return url
		}
	}
	return nil
}

func FindByID(id string) *URL {
	jsonURL, _ := client.Hget("urls", id)
	return decodeURL(jsonURL)
}

func decodeURL(jsonURL []byte) *URL {
	var url *URL

	err := json.Unmarshal(jsonURL, &url)

	if err != nil {
		fmt.Println("error:", err)
	}
	return url
}

func (u *URL) Stats() *Stats {
	clicks := FindClickByID(u.ID)
	return &Stats{u, clicks}
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
