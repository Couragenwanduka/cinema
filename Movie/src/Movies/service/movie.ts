import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

interface Imovie {
  id?: number;
  title: string;
  originalTitle: string;
  runtime: number;
  language: string;
  mpaaRating: string;
  synopsis: string;
  tagLine: string;
  budget: number;
  genre: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}


class MovieService {
  async createMovie(movie: Imovie): Promise<null| number> {
    try {
      const newMovie = await prisma.movie.create({
        data: {
          title: movie.title,
          originalTitle: movie.originalTitle,
          runtime: movie.runtime,
          language: movie.language,
          mpaaRating: movie.mpaaRating,
          synopsis: movie.synopsis,
          tagLine: movie.tagLine,
          budget: movie.budget,
          genre: movie.genre,
          duration: movie.duration,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
        },
      });
      return newMovie.id;;
    } catch (error) {
      console.error("Error creating movie:", error);
      return null;
    }
  }

  async getAllMovies(page:number, pageSize:number): Promise<Imovie[]> {
    try {
      const skip = (page - 1) * pageSize
      const movies = await prisma.movie.findMany({
        skip: skip, 
        take: pageSize , 
        include:{
          cast:true, 
          crews:true, 
          productionCompanies:true
  
        }});
      return movies;
    } catch (error) {
      console.error("Error getting all movies:", error);
      return [];
    }
  }

  async getMovieById(id: number): Promise<Imovie | null> {
    try {
      const movie = await prisma.movie.findUnique({
        where: { id },
      });
      return movie;
    } catch (error) {
      console.error("Error getting movie by id:", error);
      return null;
    }
  }

  async updateMovie(id: number, movie: Imovie): Promise<null | number> {
    try {
      const updatedMovie = await prisma.movie.update({
        where: { id },
        data: {
          title: movie.title,
          originalTitle: movie.originalTitle,
          runtime: movie.runtime,
          language: movie.language,
          mpaaRating: movie.mpaaRating,
          synopsis: movie.synopsis,
          tagLine: movie.tagLine,
          budget: movie.budget,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
        },
      });
      return updatedMovie.id;
    } catch (error) {
      console.error("Error updating movie:", error);
      return null;
    }
  }
  async deleteMovie(id: number): Promise<boolean> {
    try {
      await prisma.movie.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting movie:", error);
      return false;
    }
  }
}

const movieService = new MovieService();

export default movieService;

