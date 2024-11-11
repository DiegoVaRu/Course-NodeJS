const http = require('node:http')
const pico = require('picocolors')

const desiredPort = process.env.PORT ?? 0

const server = http.createServer((req, res) => {
    console.log(pico.green(`REQUEST RECIVED`))
    res.end(`Hello NodeJS`)
})

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
})