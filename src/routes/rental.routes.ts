import { Router } from "express"

import { CreateRentalController } from "../modules/rentals/useCase/createRental/CreateRentalController"
import { DevolutionRentalController } from "../modules/rentals/useCase/devolutionRental/DevolutionRentalController"
import { ListRentalsByUserController } from "../modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController"
import { ListRentalActiveByUserController } from "../modules/rentals/useCase/listRentalActiveByUser/ListRentalActiveByUserController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const rentalRoutes = Router()

const createRentalControler = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()
const listRentalActiveByUserController = new ListRentalActiveByUserController()

rentalRoutes.post("/", ensureAuthenticated, createRentalControler.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle)
rentalRoutes.get("/user/active", ensureAuthenticated, listRentalActiveByUserController.handle)



export { rentalRoutes }