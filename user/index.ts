import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import errorHandling from './error/asyncError';
import router from './src/auth/route/route';
import connectDb from './src/config/mongodb';
import rateLimiterMiddleware from './src/middleware/rateLimit';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();
const port =  4000; 

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter middleware
app.use(rateLimiterMiddleware as (req: Request, res: Response, next: NextFunction) => void);

// Your routes and middleware go here
app.use('/auth', router);

// Error handling middleware
app.use(errorHandling as (err: unknown, req: Request, res: Response, next: NextFunction) => void);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });