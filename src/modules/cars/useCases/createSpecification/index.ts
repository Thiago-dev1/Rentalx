import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpeficificationController } from "./CreateSpecificationController";
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSpeficificationController => {
    const specificationRepository = new SpecificationsRepository()
    const createSpecificationUseCase = new CreateSpeficificationUseCase(specificationRepository)
    const createSpecificationController = new CreateSpeficificationController(createSpecificationUseCase)

    return  createSpecificationController 
}

