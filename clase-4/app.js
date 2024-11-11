const express = require('express')
const crypto = require('node:crypto')
const eval = require('./eval.js')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

const movies = require('./movies.json')

app.get('/', (req, res) => {
    res.send("Hello NodeJS")
})

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const {genre} = req.query
    if(genre){
        filterMovies = movies.filter(
            movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filterMovies)
    }

    res.json(movies)
})
app.get('/movies/:id', (req, res) => {
    const {id} = req.params

    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)
    res.status(404).send('<h1>404 Movie not found</h1>')
})

app.post('/movies', (req, res) => {
    const result = eval.validateMovie(req.body)    
    if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = eval.validatePartialMovie(req.body)
    if(result.error){
        return res.status(400).json( { message: JSON.parse(result.error.message) } )
    }

    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex===-1) return res.status(404).json({ message: 'Movie not found' })

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1)
        res.status(404).json({message:"Movie not found"})

    movies.splice(movieIndex, 1)
    res.status(204).send()
})


app.use((err, req, res) => {
    console.error(err.stack);
    res.status(404).send('404 Page not found');
});

app.listen(PORT, () => { 
    console.log(`server listening at http://localhost:${PORT}`)
})