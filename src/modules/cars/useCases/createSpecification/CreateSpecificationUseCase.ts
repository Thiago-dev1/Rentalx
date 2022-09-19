import { inject, injectable } from "tsyringe"
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";


interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpeficificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: SpecificationsRepository) {}

   async execute({name, description}: IRequest) {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists === 1) {
            throw new Error ("Category already exists")
         }
     
         this.specificationsRepository.create({name, description})
    }
}

export { CreateSpeficificationUseCase }