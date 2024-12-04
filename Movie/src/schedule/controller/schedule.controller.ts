import theaterService from "../../theater/service";
import scheduleService from "../service/schedule.service";
import movieService from "../../Movies/service/movie";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../../error/error";


class ScheduleController {

    async createSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const {movieId, theater, startTime} = req.body;
            
            const exisitingMovie = await movieService.getMovieById(movieId)
            if(!exisitingMovie){
                throw new BadRequest("Movie not found");
            }

            const existingTheater = await theaterService.findTheaterByName(theater);
            if (!existingTheater) {
                throw new BadRequest("Theater not found");
            }
            const endTime = new Date(startTime);
            endTime.setMinutes(startTime.getMinutes() + parseInt(exisitingMovie.duration));


            const scheduleConflict = await scheduleService.getScheduleByStartAndEndDate(existingTheater.id, startTime, endTime);
            if (scheduleConflict) {
                throw new BadRequest("Theater is already booked for the selected time slot.");
            }
            
            const schedule ={
                movieId,
                theaterId: existingTheater.id,
                startTime,
                endTime
            }

             await scheduleService.createSchedule(schedule); 
             res.status(201).json({ message: "Schedule created successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getAllSchedules(req: Request, res: Response, next:NextFunction){
        try {
            const schedules = await scheduleService.getAllSchedule();
            res.json(schedules);
        } catch (error) {
            next(error);
        }
    }
    async getScheduleByTheaterId(req: Request, res: Response, next: NextFunction){
        try {
            const { theaterId } = req.params;
            const schedules = await scheduleService.getAllSchedulesByTheaterId(parseInt(theaterId));
            res.json(schedules);
        } catch (error) {
            next(error);
        }
    }
    async deleteSchedule(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            await scheduleService.deleteSchedule(parseInt(id));
            res.json({ message: "Schedule deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export default ScheduleController;

// schedule.controller.ts

