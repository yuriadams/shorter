package url

import (
	"encoding/json"

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

func (r *repositorioRedis) IdExiste(id string) bool {
	_, existe := r.urls[id]
	return existe
}

func (r *repositorioRedis) BuscarPorId(id string) *Url {
	return r.urls[id]
}

func (r *repositorioRedis) BuscarPorUrl(url string) *Url {
	for _, u := range r.urls {
		if u.Destino == url {
			return u
		}
	}
	return nil
}

func (r *repositorioRedis) Salvar(url Url) error {
	urlJSON, _ := json.Marshal(url)
	client.Set(url.Id, []byte(urlJSON))
	val, _ := client.Get(url.Id)
	println(string(val))
	client.Del(url.Id)
	// r.urls[url.Id] = &url
	return nil
}

func (r *repositorioRedis) RegistrarClick(id string) {
	r.clicks[id]++
}

func (r *repositorioRedis) BuscarClicks(id string) int {
	return r.clicks[id]
}
