import movies from "../movies.json" with { type: 'json' }
import { randomUUID } from 'node:crypto'

export class MovieManager {

    static async getAll(genre) {
        if(genre) {
            if(movies.find(movie => movie.genre.includes(genre)) != undefined) return movies.filter(
                movie => movie.genre && movie.genre.some(gen => typeof gen === 'string' && gen.toLowerCase() === genre.toLowerCase())            
            )
            return false
        }            
        return movies
    }

    static async getById(id) {
        const movie = movies.find(movie => movie.id === id)
        if(movie) return movie
        return false
    }

    static async createMovie(input) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }    
        movies.push(newMovie)
    }

    static async updateMovie(id, input) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if(movieIndex===-1) return false

        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }

        movies[movieIndex] = updateMovie
        return movies[movieIndex]
    }

    static async deleteMovie({id}) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if(movieIndex === -1) return false    
        movies.splice(movieIndex, 1)
        return true
    }
}