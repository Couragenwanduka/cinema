import express from 'express';
import ScheduleController from '../controller/schedule.controller';
import { validator } from '../../Movies/middleware/validation';
import scheduleSchema from '../schema/schedule';

const scheduleRouter = express.Router();
const scheduleController = new ScheduleController();

// Schedule CRUD
scheduleRouter.post('/', [validator(scheduleSchema)],scheduleController.createSchedule.bind(scheduleController));
scheduleRouter.get('/', scheduleController.getAllSchedules.bind(scheduleController));
scheduleRouter.get('/theater/:theaterId', scheduleController.getScheduleByTheaterId.bind(scheduleController));
scheduleRouter.delete('/:id', scheduleController.deleteSchedule.bind(scheduleController));

export default scheduleRouter;