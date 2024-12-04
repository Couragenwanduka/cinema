import express from 'express';
import { validator } from '../../Movies/middleware/validation';
import theaterController from '../controller/theater.controller';
import theaterSchema from '../schema/theater.schema';


const theaterRouter = express.Router();

// Theater CRUD
theaterRouter.post('/', [validator(theaterSchema)],theaterController.createTheater.bind(theaterController));
theaterRouter.get('/', theaterController.getAllTheaters.bind(theaterController));
theaterRouter.put('/:id', theaterController.updateTheater.bind(theaterController));

export default theaterRouter;