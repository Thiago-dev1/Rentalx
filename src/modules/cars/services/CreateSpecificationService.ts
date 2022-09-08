import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}


class CreateSpeficificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute({name, description}: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error ("Category already exists")
         }
     
         this.specificationsRepository.create({name, description})
    }
}

export { CreateSpeficificationService }