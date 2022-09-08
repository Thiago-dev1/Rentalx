import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpeficificationController } from "./CreateSpecificationController";
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";


const specificationRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpeficificationUseCase(specificationRepository)
const createSpecificationController = new CreateSpeficificationController(createSpecificationUseCase)

export { createSpecificationController }