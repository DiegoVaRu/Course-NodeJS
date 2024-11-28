import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'dvrDB05.',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieManager {
    static async getAll(genre) {
        if(genre){
            const lowerGenre = genre.toLowerCase()
            
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', 
                [lowerGenre]
            )
            
            if (genres.length === 0) return null 

            const [{id}] = genres
            
            const [movie] = await connection.query(
                `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
                    FROM movie
                    JOIN movie_genres ON id = movie_id
                    WHERE genre_id = ?;`,  
                [id]
            )

            return movie
        }

        const [movies] = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
            FROM movie;`
        )

        return movies
    }

    static async getById(id) {
        const [movies] = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )
        if (movies.length === 0) return null
        return movies[0]
    }

    static async createMovie(input) {
        const {
            genre,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input.data
        
        const [uuidParse] = await connection.query(
            `SELECT UUID() uuid;`
        )
        const [{uuid}] = uuidParse

        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                    VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, director, duration, poster, rate]
            )
        } catch(e) {
            throw new Error(`The movie wasn't created`)
        }
        
        await Promise.all(genre.map(async (gen) => {
            const [genreID] = await connection.query(
                `SELECT id from genre WHERE name = ?`,
                [gen]
            );
            const [{ id }] = genreID;
        
            await connection.query(
                `INSERT INTO movie_genres (movie_id, genre_id)
                    VALUES ((SELECT id FROM movie WHERE id = UUID_TO_BIN("${uuid}")), ?)`,
                [id]
            );
        }));
        

        const [movie] = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
                FROM movie WHERE title = ?;`,
                [title]
        )

        return movie[0]
    }

    static async updateMovie(id, input) {
        //todo
    }

    static async deleteMovie({id}) {
        //todo
    }
}