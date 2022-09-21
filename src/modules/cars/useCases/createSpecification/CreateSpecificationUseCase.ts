import { inject, injectable } from "tsyringe"

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"
import { AppError } from "../../../../errors/AppError"

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpeficificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {}

   async execute({name, description}: IRequest) {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists) {
            throw new AppError("Category already exists")
        }
     
         this.specificationsRepository.create({name, description})
    }
}

export { CreateSpeficificationUseCase }