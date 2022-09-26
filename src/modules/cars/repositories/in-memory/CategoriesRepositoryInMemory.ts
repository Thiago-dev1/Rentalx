
import { Category } from "@prisma/client";

import crypto from 'node:crypto';
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository"

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    public categories: Category[] = []

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category => category.name === name))

        return category
    }

    async list(): Promise<Category[]> {
        const all = this.categories
        return all
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
       this.categories.push({
            id: crypto.randomUUID(),
            name,
            description,
            createdAt: new Date()
       })
    }
}

export { CategoriesRepositoryInMemory }