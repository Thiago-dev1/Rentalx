import { inject, injectable } from "tsyringe"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository) {}

    async execute() {
        const specifications = await this.specificationRepository.list()
        
        return specifications
    }
}

export { ListSpecificationsUseCase }