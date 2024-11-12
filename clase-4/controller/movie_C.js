import { MovieManager } from "../model/movie_M.js";
import { validateMovie, validatePartialMovie } from '../eval.js'

export class MovieController {

    static async getAll(req, res) {
        res.header('Access-Control-Allow-Origin', '*')
        const {genre} = req.query
        const movies = await MovieManager.getAll(genre)
        if (!movies) return res.status(404).send('<h1>404: Movies not found</h1>')
            res.json(movies)
    }

    static async getById (req, res) {
        const {id} = req.params
        const movie = await MovieManager.getById(id)
        if(movie) return res.json(movie)
        res.status(404).send('<h1>404: Movie not found</h1>')
    }

    static async createMovie(req, res) {
        const result = validateMovie(req.body)    
        if(result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    
        await MovieManager.createMovie(result)
        res.status(201).json(newMovie)
    }

    static async uptdateMovie(req, res) {
        const result = validatePartialMovie(req.body)
        if(result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })
        const {id} = req.params
        
        const movieUpdated = MovieManager.updateMovie(id, result)
        if(!movieUpdated) return res.status(404).send('<h1>404: Movie not found</h1>')

        return res.json()
    }

    static async deleteMovie(req, res) {
        const {id} = req.params
        
        if(await MovieManager.deleteMovie(id)) return res.status(204).send()
        res.status(400).send(`<h1>400: Movie was not deleted correctly</h1>`)
    }
}