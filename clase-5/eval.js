import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'The title must be a string',
        required_error: 'This value is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string({ invalid_type_error: 'The director must be a string' }),
    duration: z.number().int().positive(),
    poster: z.string().url({ message: 'Poster must be a valid url'}),
    rate: z.number().min(0).max(10).optional(),
    genre: z.array(
        z.enum(['Action', 'Crime', 'Drama', 'Sci-Fi', 'Romance', 'Adventure', 'Biography', 'Fantasy'])
    )
})

export function validateMovie(input){
    return movieSchema.safeParse(input)
}

export function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}