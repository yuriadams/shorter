package url

import (
	"encoding/json"
	"fmt"

	"github.com/monnand/goredis"
)

var client goredis.Client

type repositorioRedis struct {
	urls   map[string]*Url
	clicks map[string]int
}

func NovoRepositorioRedis() *repositorioRedis {
	client.Addr = "127.0.0.1:6379"
	return &repositorioRedis{
		make(map[string]*Url),
		make(map[string]int),
	}
}

func (r *repositorioRedis) IDExiste(id string) bool {
	url := r.BuscarPorID(id)
	return url != nil
}

func (r *repositorioRedis) BuscarPorID(id string) *Url {
	jsonURL, _ := client.Hget("urls", id)
	return r.DecodeURL(jsonURL)
}

func (r *repositorioRedis) DecodeURL(jsonURL []byte) *Url {
	var url *Url

	err := json.Unmarshal(jsonURL, &url)

	if err != nil {
		fmt.Println("error:", err)
	}
	return url
}

func (r *repositorioRedis) BuscarPorURL(urlDestino string) *Url {
	urls, _ := client.Lrange("urls", 0, -1)

	for _, u := range urls {
		url := r.DecodeURL(u)
		if url.Destino == urlDestino {
			return url
		}
	}
	return nil
}

func (r *repositorioRedis) Salvar(url Url) error {
	urlJSON, _ := json.Marshal(url)
	client.Hset("urls", url.Id, []byte(urlJSON))
	return nil
}

func (r *repositorioRedis) RegistrarClick(id string) {
	clicks := r.BuscarClicks(id)
	client.Hset("clicks", id, clicks++)
}

func (r *repositorioRedis) BuscarClicks(id string) int {
	return client.Hget("clicks", id)
}
