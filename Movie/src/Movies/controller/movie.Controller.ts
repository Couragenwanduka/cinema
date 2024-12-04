import {Request, Response, NextFunction} from 'express';
import movieService from '../service/movie';
import castService from '../service/cast';
import productionService from '../service/productionCompany';
import crewService from '../service/crew';
import BadRequest from '../../error/error';


class MovieController {

    async createMovie(req: Request, res: Response, next: NextFunction) {
        try{
            const {movie, crew, cast , productionCompany} = req.body;

            const newMovieId = await movieService.createMovie(movie)
            if (!newMovieId) throw new BadRequest('No movie with id');
    
            await Promise.all([
                castService.createCast(newMovieId, cast),
                crewService.createCrew(newMovieId, crew),
                productionService.createProduction(newMovieId, productionCompany),
            ]);

            res.status(201).json({
                message: 'Movie created successfully',
                movieId: newMovieId
            })
        }catch(error){
            next(error)
        }
    }

    async getMovieById(req: Request, res: Response, next: NextFunction) {
        try{
            const { id } = req.params;

            const movie = await movieService.getMovieById(parseInt(id));
            if(!movie) throw new BadRequest('Movie not found')

            res.status(201).json({
                movie
            })
        }catch(error){
            next(error)
        }
    }


    async getAllMovies(req: Request, res: Response, next: NextFunction) {
        try {
            // Parse query parameters with defaults
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;

            // Fetch movies from the service
            const movies = await movieService.getAllMovies(page, pageSize);

            // Respond with metadata and movie data
            res.json({
                success: true,
                message: "Movies retrieved successfully",
                data: {
                    currentPage: page,
                    pageSize,
                    movies,
                },
            });
        } catch (error) {
            next(error); 
        }
    }

    async updateMovie(req: Request, res: Response, next: NextFunction) {
        try{
            const { id } = req.params;
            const { movie } = req.body;

            const updatedMovie = await movieService.updateMovie(parseInt(id), movie)
            if (!updatedMovie) throw new BadRequest('No movie with id');

            res.status(200).json({
                message: 'Movie updated successfully',
                movieId: parseInt(id)
            })
        }catch(error){
            next(error)
        }
    }
    async deleteMovie(req: Request, res: Response, next: NextFunction) {
        try{
            const { id } = req.params;

            const deletedMovie = await movieService.deleteMovie(parseInt(id));
            if (!deletedMovie) throw new BadRequest('No movie with id');

            res.status(200).json({
                message: 'Movie deleted successfully',
                movieId: parseInt(id)
            })
        }catch(error){
            next(error)
        }
    }

}

export default MovieController;