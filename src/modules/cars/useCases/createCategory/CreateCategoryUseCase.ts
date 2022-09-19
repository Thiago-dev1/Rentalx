import { inject, injectable } from "tsyringe"
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository) {}

   async execute({name, description}: IRequest){
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadyExists === 1) {
            throw new Error ("Category already exists")
        }
    
        this.categoriesRepository.create({name, description})
        
    }
}

export { CreateCategoryUseCase }