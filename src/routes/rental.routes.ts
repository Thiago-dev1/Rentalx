import { Router } from "express"

import { CreateRentalController } from "../modules/rentals/useCase/createRental/CreateRentalController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const rentalRoutes = Router()

const createRentalControler = new CreateRentalController()

rentalRoutes.post("/", ensureAuthenticated, createRentalControler.handle)

export { rentalRoutes }