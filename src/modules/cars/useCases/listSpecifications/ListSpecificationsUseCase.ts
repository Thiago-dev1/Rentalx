import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Specification } from "../../model/Specification";


class ListSpecificationsUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}

    execute(): Specification[] {
        const specifications = this.specificationRepository.list()
        
        return specifications
    }
}

export { ListSpecificationsUseCase }