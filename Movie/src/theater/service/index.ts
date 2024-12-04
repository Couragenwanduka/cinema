import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

interface Theater {
    name:string;
    address:string;
    capacity: number
}

class TheaterService {

    async createTheater (theater: Theater) {
        return await prisma.theater.create({
            data: {
                name: theater.name,
                address: theater.address,
                capacity: theater.capacity,
            }
        })

    }
    async findTheaterByName (name:string){
        return await prisma.theater.findFirst({
            where: {
                name: name
            }
        })
    }
    async getTheaterById(id: number){
        return await prisma.theater.findUnique({
            where: {
                id: id,
            }
        })
    }
    async updateTheater(id: number, theater: Theater){
        return await prisma.theater.update({
            where: {
                id: id,
            },
            data: {
                name: theater.name,
                address: theater.address,
                capacity: theater.capacity,
            },
        })
    }
    async getAllTheaters(){
        return await prisma.theater.findMany()
    }

    async deleteTheater(id: number){
        return await prisma.theater.delete({
            where: {
                id: id,
            },
        })
    }
}


const theaterService = new TheaterService();

export default theaterService;