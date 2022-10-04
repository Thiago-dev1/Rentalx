import { Router } from "express"
import multer from "multer"

import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController"
import { ListAvailableCarsController } from "../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { CreateCarSpecificationController } from "../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { UploadCarImageController } from "../modules/cars/useCases/uploadCarImage/UploadCarImageController"

import uploadConfig from "../config/upload"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const carsRoutes = Router()

const upload = multer(uploadConfig.upload("./tmp/car"))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin ,createCarController.handle)
carsRoutes.post("/create/specification", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/image/:id",ensureAuthenticated, ensureAdmin, upload.single("image"), uploadCarImageController.handle)

export { carsRoutes }