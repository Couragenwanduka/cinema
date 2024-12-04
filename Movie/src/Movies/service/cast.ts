import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


interface Icast {
    id: number,
    actorName : string,
    role: string,
}

class Cast {
    async createCast (movie_id:number, crew:Icast[]){
        try {

            const castData = crew.map((member) => ({
                movieId: movie_id,
                actorName: member.actorName,
                role: member.role,
                createdAt: new Date(),  
                updatedAt: new Date(),
            }))
            
            const createdCast = await prisma.cast.createMany({
                data: castData,
                skipDuplicates: true,
            });
            return createdCast;
        } catch (error) {
            console.error("Error creating crew:", error);
            return null;
        }
    }
    async getAllCastsByMovieId(movie_id:number): Promise<Icast[]>{
        try {
            const crews = await prisma.cast.findMany({
                where: {
                    movieId: movie_id,
                },
            });
            return crews;
        } catch (error) {
            console.error("Error getting all crews by movie id:", error);
            return [];
        }
    }
    async getCastById(id:number): Promise<Icast | null>{
        try {
            const crew = await prisma.cast.findUnique({
                where: {
                    id: id,
                },
            });
            return crew;
        } catch (error) {
            console.error("Error getting crew by id:", error);
            return null;
        }
    }
    async updateCast(id:number, updatedCrew:Icast): Promise<Icast | null>{
        try {
            const updatCrew = await prisma.cast.update({
                where: {
                    id: id,
                },
                data: {
                    actorName: updatedCrew.actorName,
                    role: updatedCrew.role,
                },
            });
            return updatedCrew;
        } catch (error) {
            console.error("Error updating crew:", error);
            return null;
        }
    }
    async deleteCast(id:number): Promise<boolean>{
        try {
            await prisma.cast.delete({
                where: {
                    id: id,
                },
            });
            return true;
        } catch (error) {
            console.error("Error deleting crew:", error);
            return false;
        }
    }
}

// Example usage of the Cast class  
const castService = new Cast();

export default castService