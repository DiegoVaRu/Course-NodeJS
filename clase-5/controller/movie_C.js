import { validateMovie, validatePartialMovie } from '../eval.js'

export class MovieController {
    constructor({movieManager}){
        this.movieManager = movieManager
    }

    getAll = async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        const {genre} = req.query
        const movies = await this.movieManager.getAll(genre)
        if (!movies) return res.status(404).send('<h1>404: Movies not found</h1>')
            res.json(movies)
    }

    getById  = async (req, res) => {
        const {id} = req.params
        const movie = await this.movieManager.getById(id)
        if(movie) return res.json(movie)
        res.status(404).send('<h1>404: Movie not found</h1>')
    }

    createMovie = async (req, res) => {
        const result = validateMovie(req.body)    
        if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    
        const newMovie = await this.movieManager.createMovie(result)
        res.status(201).json(newMovie)
    }

    uptdateMovie = async (req, res) => {
        const result = validatePartialMovie(req.body)
        if(result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })
        const {id} = req.params
        
        const movieUpdated = this.movieManager.updateMovie(id, result)
        if(!movieUpdated) return res.status(404).send('<h1>404: Movie not found</h1>')

        return res.json()
    }

    deleteMovie = async (req, res) => {
        const {id} = req.params
        
        if(await this.movieManager.deleteMovie(id)) return res.status(204).send()
        res.status(400).send(`<h1>400: Movie was not deleted correctly</h1>`)
    }
}