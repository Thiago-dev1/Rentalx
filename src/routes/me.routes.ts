import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByTokenController } from "../modules/accounts/useCase/getUserByToken/GetUserByTokenController"

const meRoutes = Router()

const getUserByTokenController = new GetUserByTokenController()

meRoutes.use(ensureAuthenticated)
meRoutes.get('/me', getUserByTokenController.handle)


export { meRoutes }