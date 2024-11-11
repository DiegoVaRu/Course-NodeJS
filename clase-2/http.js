const http = require('node:http')

//SERVIDOR FEITO SJSJJS
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if(req.url === '/'){
        res.statusCode = 200
        res.end('Hello NodeJS')
    }
    else if('/favicon.ico'){
        res.statusCode = 200
    }
    else if(req.url === '/contacto'){
        res.statusCode = 200
        res.end('My first server :D')
    }
    else {
        res.statusCode = 404
        res.end('Error 404: Page not found')
    }
})

server.listen(1234, () => {
    console.log(`server listening on port http://localhost:1234`)
})