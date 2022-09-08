import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { Router } from "express";



const specificationsRoutes = Router()

specificationsRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res)
})

specificationsRoutes.get("/", (req, res) => {
    const all = specificationsRepository.list()

    return res.json(all)
})

export { specificationsRoutes }