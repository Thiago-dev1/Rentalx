import { Router } from "express";

import { CreateSpeficificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const specificationsRoutes = Router()

const createSpeficificationController = new CreateSpeficificationController()
const listSpecificationsController  = new ListSpecificationsController()


specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpeficificationController.handle)

specificationsRoutes.get("/", listSpecificationsController.handle)

export { specificationsRoutes }