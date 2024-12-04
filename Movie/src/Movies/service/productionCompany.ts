import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Production{
    id: number
    movieId: number
    companyName: string
}

class ProductionService {
    async createProduction (movie_id:number, production:string){
        try {
            const newProduction = await prisma.productionCompany.create({
                data: {
                    movieId: movie_id,
                    companyName: production,
                },
            });
            return newProduction;
        } catch (error) {
            console.error("Error creating production:", error);
            return null;
        }
    }
    async getAllProductionsByMovieId(movie_id:number): Promise<Production[]>{
        try {
            const productions = await prisma.productionCompany.findMany({
                where: {
                    movieId: movie_id,
                },
            });
            return productions;
        } catch (error) {
            console.error("Error getting all productions by movie id:", error);
            return [];
        }
    }
    async getProductionById(id:number): Promise<Production | null>{
        try {
            const production = await prisma.productionCompany.findUnique({
                where: {
                    id: id,
                },
            });
            return production;
        } catch (error) {
            console.error("Error getting production by id:", error);
            return null;
        }
    }
    async updateProduction(id:number, production:Production): Promise<null | Production> {
        try {
            const updatedProduction = await prisma.productionCompany.update({
                where: {
                    id: id,
                },
                data: production,
            });
            return updatedProduction;
        } catch (error) {
            console.error("Error updating production:", error);
            return null;
        }
    }
}

const productionService = new ProductionService();

export default productionService;