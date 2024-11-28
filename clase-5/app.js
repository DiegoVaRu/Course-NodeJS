import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({movieManager}) => {
    const app = express()
    
    app.use(json())
    app.disable('x-powered-by')
    
    const PORT = process.env.PORT ?? 1234
    
    
    app.get('/', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.send("<h1>Hello NodeJS... This is a basic API that manage information about a few movies.</h1>")
        //res.sendFile(__dirname + "/home.html")
    })
    app.get('/favicon.ico', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
    })
    
    app.use('/movies', createMovieRouter({ movieManager }))
    
    app.use((err, req, res) => {    
        console.error(err.stack);
        res.status(404).send('<h1>404: Page not found</h1>');
    });
    
    app.listen(PORT, () => { 
        console.log(`server listening at http://localhost:${PORT}`)
    })
}