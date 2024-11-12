import { Router } from "express";
import { MovieController } from "../controller/movie_C.js";

export const moviesRouter = Router()

//---------------GETS----------------------------------------------------------------------
moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)

//---------------POST----------------------------------------------------------------------
moviesRouter.post('/', MovieController.createMovie)


//---------------PATCH---------------------------------------------------------------------
moviesRouter.patch('/:id', MovieController.uptdateMovie)

//---------------DELETE--------------------------------------------------------------------
moviesRouter.delete('/:id', MovieController.deleteMovie)