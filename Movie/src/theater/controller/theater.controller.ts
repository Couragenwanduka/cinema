import { Request, Response, NextFunction } from "express";
import BadRequest from "../../error/error";
import theaterService from "../service";

class TheaterController {
    async createTheater(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, address, capacity } = req.body;
            const existingTheater = await theaterService.findTheaterByName(name);
            if (existingTheater) {
                throw new BadRequest("Theater already exists");
            }

            const theater = await theaterService.createTheater({ name, address, capacity });
            res.status(201).json(theater);
        } catch (error) {
            next(error);
        }
    }

    async getAllTheaters(req: Request, res: Response, next: NextFunction) {
        try {
            const theaters = await theaterService.getAllTheaters();
            res.json(theaters);
        } catch (error) {
            next(error);
        }
    }
    async updateTheater(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, address, capacity } = req.body;

            const existingTheater = await theaterService.getTheaterById(parseInt(id));
            if (!existingTheater) {
                throw new BadRequest("Theater not found");
            }

            const updatedTheater = await theaterService.updateTheater(parseInt(id), { name, address, capacity });
            res.json(updatedTheater);
        } catch (error) {
            next(error);
        }
    }
}

const theaterController = new TheaterController

export default theaterController;