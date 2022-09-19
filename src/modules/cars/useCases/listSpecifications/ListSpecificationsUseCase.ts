
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";


class ListSpecificationsUseCase {
    constructor(private specificationRepository: SpecificationsRepository) {}

    async execute() {
        const specifications = await this.specificationRepository.list()
        
        return specifications
    }
}

export { ListSpecificationsUseCase }