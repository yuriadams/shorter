package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/yuriadams/shorter/url"
)

var (
	logOn   *bool
	port    *int
	urlBase string
)

func init() {
	domain := flag.String("d", "localhost", "domain")
	port = flag.Int("p", 8888, "port")
	logOn = flag.Bool("l", true, "log on/off")

	flag.Parse()

	urlBase = fmt.Sprintf("http://%s:%d", *domain, *port)
}

type Headers map[string]string

type Dispatcher struct {
	stats chan string
}

func (r *Dispatcher) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	findURLAndExecute(w, req, func(url *url.URL) {
		http.Redirect(w, req, url.Destino, http.StatusMovedPermanently)
		r.stats <- url.ID
	})
}

func Shorter(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		respondWith(w, http.StatusMethodNotAllowed, Headers{"Allow": "POST"})
		return
	}

	url, nova, err := url.FindORCreateURL(extractURL(r))

	if err != nil {
		respondWith(w, http.StatusBadRequest, nil)
		return
	}

	var status int
	if nova {
		status = http.StatusCreated
	} else {
		status = http.StatusOK
	}

	urlCurta := fmt.Sprintf("%s/r/%s", urlBase, url.ID)

	respondWith(w, status, Headers{
		"Location": urlCurta,
		"Link":     fmt.Sprintf("<%s/api/stats/%s>; rel=\"stats\"", urlBase, url.ID),
	})

	logging("URL %s shorted with sucess to %s.", url.Destino, urlCurta)
}

func Viewer(w http.ResponseWriter, r *http.Request) {
	findURLAndExecute(w, r, func(url *url.URL) {
		json, err := json.Marshal(url.Stats())

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		respondWithJSON(w, string(json))
	})
}

func findURLAndExecute(w http.ResponseWriter, r *http.Request, executor func(*url.URL)) {
	path := strings.Split(r.URL.Path, "/")
	id := path[len(path)-1]

	if url := url.FindByID(id); url != nil {
		executor(url)
	} else {
		http.NotFound(w, r)
	}
}

func respondWith(w http.ResponseWriter, status int, headers Headers) {
	for k, v := range headers {
		w.Header().Set(k, v)
	}
	w.WriteHeader(status)
}

func respondWithJSON(w http.ResponseWriter, resposta string) {
	respondWith(w, http.StatusOK, Headers{"Content-Type": "application/json"})
	fmt.Fprintf(w, resposta)
}

func extractURL(r *http.Request) string {
	rawBody := make([]byte, r.ContentLength, r.ContentLength)
	r.Body.Read(rawBody)
	return string(rawBody)
}

func saveStatistics(stats <-chan string) {
	for id := range stats {
		url.SaveClick(id)
		logging("Click saved with success %s.", id)
	}
}

func logging(formato string, valores ...interface{}) {
	if *logOn {
		log.Printf(fmt.Sprintf("%s\n", formato), valores...)
	}
}

func main() {
	stats := make(chan string)
	defer close(stats)
	go saveStatistics(stats)

	http.Handle("/r/", &Dispatcher{stats})
	http.HandleFunc("/api/short", Shorter)
	http.HandleFunc("/api/stats/", Viewer)

	logging("Starting server %d...", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
