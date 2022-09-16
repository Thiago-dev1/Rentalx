import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"
import { Category } from "../../model/Category"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

class ListCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async execute() {
        const categories = await this.categoriesRepository.list()

        return categories
    }
}

export { ListCategoriesUseCase }