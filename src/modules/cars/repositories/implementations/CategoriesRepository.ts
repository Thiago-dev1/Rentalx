import { Category } from "../../model/Category";
import {ICategoriesRepository, ICreateCategoryDTO} from "../ICategoriesRepository"

import {PrismaClient} from "@prisma/client"


class CategoriesRepository {
    private prisma: PrismaClient


    constructor() {
        this.prisma = new PrismaClient()
    }


   async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        await this.prisma.category.create({
            data: {
                name: name,
                description: description
            }
        })
    }

    async list() {
        const categories = await this.prisma.category.findMany({
            select: {
                name: true,
                description: true
            }
        })
        
        return categories
    }

    async findByName(name: string) {
        const category = await this.prisma.category.findMany({
            select: {
                name: true
            },
            where: {
                name
            }
        })
        return category.length
    }
}

export { CategoriesRepository }