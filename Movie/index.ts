import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import movieRouter from './src/Movies/route/movie.router';
import errorHandling from './src/error/asyncError';
import scheduleRouter from './src/schedule/router/route';
import theaterRouter from './src/theater/router/router';
const app = express();


// Load environment variables from.env file
dotenv.config();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Port = process.env.PORT || 7000;

// Routes
app.use('/movies', movieRouter);
app.use('/schedule', scheduleRouter);
app.use('/theaters', theaterRouter);



// Error handling middleware
app.use(errorHandling as (err: unknown, req: Request, res: Response, next: NextFunction) => void);


app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});