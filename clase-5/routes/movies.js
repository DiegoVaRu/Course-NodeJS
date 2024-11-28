import { Router } from "express";
import { MovieController } from "../controller/movie_C.js";

export const createMovieRouter = ({ movieManager }) => {
    const movieController = new MovieController({ movieManager }) 
    const moviesRouter = Router()

    //---------------GETS----------------------------------------------------------------------
    moviesRouter.get('/', movieController.getAll)
    moviesRouter.get('/:id', movieController.getById)
    
    //---------------POST----------------------------------------------------------------------
    moviesRouter.post('/', movieController.createMovie)
    
    
    //---------------PATCH---------------------------------------------------------------------
    moviesRouter.patch('/:id', movieController.uptdateMovie)
    
    //---------------DELETE--------------------------------------------------------------------
    moviesRouter.delete('/:id', movieController.deleteMovie)

    return moviesRouter
}