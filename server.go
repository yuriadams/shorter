package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
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

func main() {
	r := httprouter.New()
	r.GET("/r/:id", DispatchHandler)
	r.POST("/api/short", CreateShortedURLHandler)
	r.GET("/api/stats/:id", ViewStatisticsHandler)
	r.GET("/api/stats", ListURLHandler)

	logging("Starting server %d...", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), r))
}

func ListURLHandler(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	json, err := json.Marshal(url.List())

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	respondWithJSON(w, string(json))
}

func DispatchHandler(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	findURLAndExecute(w, r, p, func(u *url.URL) {
		http.Redirect(w, r, u.Destino, http.StatusMovedPermanently)
		url.SaveClick(u.ID)
		logging("Click saved with success %s.", u.ID)
	})
}

func CreateShortedURLHandler(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	url, new, err := url.FindORCreateURL(extractURL(r))
	if err != nil {
		respondWith(w, http.StatusBadRequest, nil)
		return
	}

	var status int
	if new {
		status = http.StatusCreated
	} else {
		status = http.StatusOK
	}

	urlShorted := fmt.Sprintf("%s/r/%s", urlBase, url.ID)

	respondWith(w, status, Headers{
		"Location": urlShorted,
		"Link":     fmt.Sprintf("<%s/api/stats/%s>; rel=\"stats\"", urlBase, url.ID),
	})

	logging("URL %s shorted with sucess to %s.", url.Destino, urlShorted)
}

func ViewStatisticsHandler(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	findURLAndExecute(w, r, p, func(url *url.URL) {
		json, err := json.Marshal(url.Stats())

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		respondWithJSON(w, string(json))
	})
}

func findURLAndExecute(w http.ResponseWriter, r *http.Request, p httprouter.Params, executor func(*url.URL)) {
	id := p.ByName("id")
	if url := url.FindByID(id); url != nil {
		executor(url)
	} else {
		http.NotFound(w, r)
	}
}

func extractURL(r *http.Request) string {
	rawBody := make([]byte, r.ContentLength, r.ContentLength)
	r.Body.Read(rawBody)
	return string(rawBody)
}

func respondWith(w http.ResponseWriter, status int, headers Headers) {
	for k, v := range headers {
		w.Header().Set(k, v)
	}
	w.WriteHeader(status)
}

func respondWithJSON(w http.ResponseWriter, resposta string) {
	respondWith(w, http.StatusOK, Headers{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"})
	fmt.Fprintf(w, resposta)
}

func logging(format string, v ...interface{}) {
	if *logOn {
		log.Printf(fmt.Sprintf("%s\n", format), v...)
	}
}
