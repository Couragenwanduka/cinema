import express from 'express';
import MovieController from '../controller/movie.Controller';
import { validator } from '../middleware/validation';
import registerMovie  from '../schema/movie.schema';
const movieRouter = express.Router();
const movieController = new MovieController();

// Movie CRUD
movieRouter.post('/create', [validator(registerMovie)],movieController.createMovie.bind(movieController));
movieRouter.get('/:id', movieController.getMovieById.bind(movieController));
movieRouter.get('/', movieController.getAllMovies.bind(movieController));
movieRouter.put('/:id', movieController.updateMovie.bind(movieController));
movieRouter.delete('/:id', movieController.deleteMovie.bind(movieController));

export default movieRouter;