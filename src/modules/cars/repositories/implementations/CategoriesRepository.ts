import { Category } from "../../model/Category";
import {ICategoriesRepository, ICreateCategoryDTO} from "../ICategoriesRepository"

import { prisma } from "../../../../database/prismaClient" 


class CategoriesRepository implements ICategoriesRepository {


   async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        await prisma.category.create({
            data: {
                name: name,
                description: description
            }
        })
    }

    async list():Promise<Category[]> {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true
            }
        })
        
        return categories
    }

    async findByName(name: string): Promise<Category> {
        const category = await prisma.category.findFirst({
            select: {
                name: true
            },
            where: {
                name
            }
        })
        return category
    }
}

export { CategoriesRepository }