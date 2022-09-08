import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpeficificationController } from "./CreateSpecificationController";
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";


const specificationRepository = SpecificationsRepository.getInstance()
const createSpecificationUseCase = new CreateSpeficificationUseCase(specificationRepository)
const createSpecificationController = new CreateSpeficificationController(createSpecificationUseCase)

export { createSpecificationController }