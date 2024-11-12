import express, { json } from 'express'
//import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
//import { myCors } from './middlewares/cors.js'

const app = express()

app.use(json())
//app.use(cors(myCors()))
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234


app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.send("Hello NodeJS... This is a basic API that manage information about a few movies.")
})
app.get('/favicon.ico', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
})

app.use('/movies', moviesRouter)

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(404).send('404 Page not found');
});

app.listen(PORT, () => { 
    console.log(`server listening at http://localhost:${PORT}`)
})