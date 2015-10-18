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

type Url struct {
	Id      string    `json:"id"`
	Criacao time.Time `json:"criacao"`
	Destino string    `json:"destino"`
}

type Stats struct {
	Url    *Url `json:"url"`
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

func FindORCreateURL(destino string) (u *Url, nova bool, err error) {
	if u = FindByURL(destino); u != nil {
		return u, false, nil
	}

	if _, err = url.ParseRequestURI(destino); err != nil {
		return nil, false, err
	}

	url := Url{makeID(), time.Now(), destino}
	urlJSON, _ := json.Marshal(url)
	client.Hset("urls", url.Id, []byte(urlJSON))
	return &url, true, nil
}

func FindByURL(urlDestino string) *Url {
	urls, _ := client.Lrange("urls", 0, -1)

	for _, u := range urls {
		url := decodeURL(u)
		if url.Destino == urlDestino {
			return url
		}
	}
	return nil
}

func FindByID(id string) *Url {
	jsonURL, _ := client.Hget("urls", id)
	return decodeURL(jsonURL)
}

func decodeURL(jsonURL []byte) *Url {
	var url *Url

	err := json.Unmarshal(jsonURL, &url)

	if err != nil {
		fmt.Println("error:", err)
	}
	return url
}

func (u *Url) Stats() *Stats {
	clicks := FindClickByID(u.Id)
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
