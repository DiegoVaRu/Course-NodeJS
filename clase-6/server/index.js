import express from 'express'
import logger from 'morgan'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import dotenv from 'dotenv'
import {createClient} from '@libsql/client'
import pico from 'picocolors'

dotenv.config()
const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: 'libsql://adapted-violations-divaru.turso.io',
    authToken: process.env.DB_TOKEN
})

async function initializeDB() {
    await db.execute(`
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        messages TEXT,
        user TEXT
    );
`)}
initializeDB().catch(console.error)

app.use(logger('dev'))

io.on('connection', async (socket) => {
    console.log(pico.green(`--> A user has connected`))

    socket.on('disconnect', () => {
        console.log(pico.red(`--> A user has disconnected`))
    })
    
    socket.on('chat message', async (msg)=>{
        let result
        const username = socket.handshake.auth.username ?? 'anonymus'

        try {
            result = await db.execute({
                sql: `INSERT INTO messages (messages, user) VALUES (:msg, :username);`,
                args: {msg, username}
            })            
        }
        catch (e) {
            console.error(e)
            return
        }
         
        io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    })

    if(!socket.recovered) {
        try {
            const result = await db.execute({
                sql: `SELECT id, messages, user FROM messages WHERE id > ?;`,
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            result.rows.forEach(row => {
                socket.emit('chat message', row.messages, row.id.toString(), row.user)
            })
        } catch (e) {
            console.error(e)
        }
    }
})

app.get('/', (req, res) => {    
    res.sendFile(process.cwd() + `/client/index.html`)
})
app.get('/favicon.ico', (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*')
})
app.get('/styles/index_s.css', (req, res) => {
    res.sendFile(process.cwd() + `/client/styles/index_s.css`)
})

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})