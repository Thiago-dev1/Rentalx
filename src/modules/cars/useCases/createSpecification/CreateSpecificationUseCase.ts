import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

class CreateSpeficificationUseCase {
    constructor(private specificationsRepository: SpecificationsRepository) {}

   async execute({name, description}: IRequest) {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists === 1) {
            throw new Error ("Category already exists")
         }
     
         this.specificationsRepository.create({name, description})
    }
}

export { CreateSpeficificationUseCase }