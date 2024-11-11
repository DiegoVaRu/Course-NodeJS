const http = require('node:http')

const charmanderJSON = require('./pokemon/charmander.json')
const bulbasaurJSON = require('./pokemon/bulbasaur.json')
const squirtleJSON = require('./pokemon/squirtle.json')

const proccessReq = (req, res) => {
    const { method, url } = req

    switch(method){
        case 'GET':
            switch(url){
                case '/':
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.end(`
                        <h1>Hello NodeJS</h1>
                        <h3>This is a server that will answer you with the information of the initial pokemons of Kanto</h3>
                        <h3>Look for each of them by clicking its name:</h3>
                        <a href="http://localhost:1234/pokemon/bulbasaur">Bulbasaur</a>
                        <br>
                        <a href="http://localhost:1234/pokemon/charmander">Charmander</a>
                        <br>
                        <a href="http://localhost:1234/pokemon/squirtle">Squirtle</a>
                        `)
                    break

                case '/pokemon/charmander':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify(charmanderJSON))
                    break

                case '/pokemon/bulbasaur':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify(bulbasaurJSON))
                    break

                case '/pokemon/squirtle':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify(squirtleJSON))
                    break
                
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404 Page not found</h1>')
            }
    }
}

const server = http.createServer(proccessReq)

server.listen(1234, () => {
    console.log(`server listening at port http://localhost:1234`)
})