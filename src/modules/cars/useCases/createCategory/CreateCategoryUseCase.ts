import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


interface IRequest {
    name: string,
    description: string
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

   async execute({name, description}: IRequest){
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadyExists === 1) {
            throw new Error ("Category already exists")
        }
    
        this.categoriesRepository.create({name, description})
        
    }
}

export { CreateCategoryUseCase }