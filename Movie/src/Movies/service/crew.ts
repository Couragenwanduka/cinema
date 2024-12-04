import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



interface Icrew {
    id: number
    movieId: number
    crewName: string
    role: string
}

class CrewService {
    
    async createCrew(movie_id: number, crew: Icrew[]) {
        try {
            // Prepare the data for bulk creation
            const crewData = crew.map((member) => ({
                movieId: movie_id,
                crewName: member.crewName,
                role: member.role,
            }));
    
            // Use createMany directly without a transaction
            const createdCrew = await prisma.crew.createMany({
                data: crewData,
                skipDuplicates: true, // Avoid inserting duplicate records
            });
    
            // Return the result
            return createdCrew;
        } catch (error) {
            console.error("Error creating crew:", error);
            throw new Error("Failed to create crew"); // Rethrow the error for higher-level handling
        }
    }
    
        async getAllCrewsByMovieId(movie_id:number): Promise<Icrew[]>{
        try {
            const crews = await prisma.crew.findMany({
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
    async getCrewById(id:number): Promise<Icrew | null>{
        try {
            const crew = await prisma.crew.findUnique({
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
    async updateCrew(id:number, crew:Icrew): Promise<null | number>{
        try {
            const updatedCrew = await prisma.crew.update({
                where: {
                    id: id,
                },
                data: {
                    crewName: crew.crewName,
                    role: crew.role,
                },
            });
            return updatedCrew.id;
        } catch (error) {
            console.error("Error updating crew:", error);
            return null;
        }
    }
    async deleteCrew(id:number): Promise<boolean>{
        try {
            await prisma.crew.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            console.error("Error deleting crew:", error);
            return false;
        }
    }
}

const crewService = new CrewService();

export default crewService;