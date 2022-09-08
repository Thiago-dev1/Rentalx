import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";
import { Router } from "express";

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post("/", (req, res) => {
    const { name, description } = req.body

    const createSpecificationService = new CreateCategoryService(specificationsRepository)

    createSpecificationService.execute({name, description})

    return res.status(201).send()
})

specificationsRoutes.get("/", (req, res) => {
    const all = specificationsRepository.list()

    return res.json(all)
})

export { specificationsRoutes }