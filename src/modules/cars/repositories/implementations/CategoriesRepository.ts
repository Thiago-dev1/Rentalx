import { Category } from "../../model/Category";
import {ICategoriesRepository, ICreateCategoryDTO} from "../ICategoriesRepository"

import {PrismaClient} from "@prisma/client"


class CategoriesRepository {
    private prisma: any

    private static INSTANCE: CategoriesRepository

    private constructor() {
        this.prisma = new PrismaClient()
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository()
        }
        return CategoriesRepository.INSTANCE
    }

   async create({ name, description }: ICreateCategoryDTO) {
        const category = await this.prisma.category.create({
            data: {
                name: name,
                description: description
            }
        })

        return category
    }

    async list() {
        const categories =  await this.prisma.category.findMany({
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