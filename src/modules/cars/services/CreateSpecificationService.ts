import { ISpecificationRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}


class createSpeficificationService {
    constructor(private specificationsRepository: ISpecificationRepository) {}

    execute({name, description}: IRequest) {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists")
        }
    }
}