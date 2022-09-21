import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpeficificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router()

const createSpeficificationController = new CreateSpeficificationController()
const listSpecificationsController  = new ListSpecificationsController()

specificationsRoutes.use(ensureAuthenticated)

specificationsRoutes.post("/", createSpeficificationController.handle)

specificationsRoutes.get("/", listSpecificationsController.handle)

export { specificationsRoutes }