import Joi from 'joi';

// Movie validation schema
const movieSchema = Joi.object({
  title: Joi.string().required(),
  originalTitle: Joi.string().required(),
  runtime: Joi.number().integer().min(1).required(), // Movie runtime in minutes
  language: Joi.string().required(),
  mpaaRating: Joi.string().required(),
  synopsis: Joi.string().required(),
  tagLine: Joi.string().required(),
  budget: Joi.number().integer().min(0).required(),
  genre: Joi.string().required(), 
  duration:Joi.string().pattern(/^([0-1]?\d|2[0-3]):[0-5]\d$/).required().messages({
    "string.pattern.base": "Duration must be in the format HH:MM (e.g., 2:30 or 02:30).",
    "any.required": "Duration is required.",
  }),
  createdAt: Joi.date().optional(), // Optional, Prisma will handle default
  updatedAt: Joi.date().optional(), // Optional, Prisma will handle default
});

// Crew validation schema
const crewSchema = Joi.array().items(
    Joi.object({
        crewName: Joi.string().required(),
        role: Joi.string().required(),
        movieId: Joi.number().integer().required(), // Referencing movieId from the Movie table
        createdAt: Joi.date().optional(), // Optional, Prisma will handle default
        updatedAt: Joi.date().optional(), // Optional, Prisma will handle default
      })
)
// Cast validation schema
const castSchema = Joi.array().items(
    Joi.object({
        actorName: Joi.string().required(),
        role: Joi.string().required(),
        movieId: Joi.number().integer().required(), // Referencing movieId from the Movie table
        createdAt: Joi.date().optional(), // Optional, Prisma will handle default
        updatedAt: Joi.date().optional(), // Optional, Prisma will handle default
      })
)

const registerMovie = Joi.object({
    movie: movieSchema,
    crew: crewSchema,
    cast: castSchema,
    productionCompany: Joi.string().required(), // Simple string production company name
  
})

export default registerMovie;