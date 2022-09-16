import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Specification } from "../../model/Specification";


class ListSpecificationsUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}

    async execute() {
        const specifications = await this.specificationRepository.list()
        
        return specifications
    }
}

export { ListSpecificationsUseCase }