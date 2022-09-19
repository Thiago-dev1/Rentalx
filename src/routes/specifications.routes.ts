import { Router } from "express";

import { CreateSpeficificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router()

const createSpeficificationController = new CreateSpeficificationController()
const listSpecificationsController  = new ListSpecificationsController()

specificationsRoutes.post("/", createSpeficificationController.handle)

specificationsRoutes.get("/", listSpecificationsController.handle)

export { specificationsRoutes }