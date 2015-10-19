# shorter

Serviço encurtador de URLs desenvolvido no livro "Programando em Go: crie aplicações com a linguagem do Google", da editora Casa do Código.

Redis used as a data repository.

It's necessary run redis before start go server:

> redis-server

Run server:

go run server.go -p=8080 -l=true -d=localhost

optional flags:

-p port
-d domain
-l log on/off

Examples:
.Short a URL:

curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST http://localhost:8080/api/short -d  "https://www.google.com.br" -c cookie -v

.Redirect:

curl -v http://localhost:8080/r/IQMrd

.View statistics

curl -v http://localhost:8080/api/stats/IQMrd
