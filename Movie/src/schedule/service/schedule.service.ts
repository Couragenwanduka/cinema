import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

interface Schedule {
    id?: number
    movieId: number
    theaterId: number
    startTime: Date
    endTime: Date
}


class ScheduleService {
    async createSchedule(schedule: Schedule){
        try {
            const newSchedule = await prisma.schedule.create({
                data: {
                    movieId: schedule.movieId,
                    theaterId: schedule.theaterId,
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                },
            });
            return newSchedule;
        } catch (error) {
            console.error("Error creating schedule:", error);
            return null;
        }
    }
    async getAllSchedulesByTheaterId(theaterId: number): Promise<Schedule[]>{
        try {
            const schedules = await prisma.schedule.findMany({
                where: {
                    theaterId: theaterId,
                },
            });
            return schedules;
        } catch (error) {
            console.error("Error getting schedules by theater id:", error);
            return [];
        }
    }
    async getScheduleByStartAndEndDate (theaterId:number, startTime:Date, endTime:Date){
        try {
            const schedule = await prisma.schedule.findFirst({
                where: {
                    theaterId: theaterId,
                    startTime: { gte: startTime },
                    endTime: { lte: endTime },
                },
            });
            return schedule;
        } catch (error) {
            console.error("Error getting schedule by start and end time:", error);
            return null;
        }

    }
    async getAllSchedule () {
        try {
            const schedules = await prisma.schedule.findMany();
            return schedules;
        } catch (error) {
            console.error("Error getting all schedules:", error);
            return [];
        }
    }
    async deleteSchedule(id: number){
        try {
            await prisma.schedule.delete({
                where: {
                    id: id,
                },
            });
            return id;
        } catch (error) {
            console.error("Error deleting schedule:", error);
            return null;
        }
    }
}


const scheduleService = new ScheduleService();

export default scheduleService;