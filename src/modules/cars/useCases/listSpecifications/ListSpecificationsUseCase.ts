import { inject, injectable } from "tsyringe"
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject(SpecificationsRepository)
        private specificationRepository: SpecificationsRepository) {}

    async execute() {
        const specifications = await this.specificationRepository.list()
        
        return specifications
    }
}

export { ListSpecificationsUseCase }