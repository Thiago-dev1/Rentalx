import { Router } from "express";
import { CreateCategoryService } from "../modules/services/CreateCategoryService";
import { CategoriesRepository } from "../modules/repositories/CategoriesRepository";


const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body

    const createCategoryService = new CreateCategoryService(categoriesRepository)

    createCategoryService.execute({name, description})

    return res.status(201).send()
})

categoriesRoutes.get("/", (req, res) => {
    const all = categoriesRepository.list()


    res.json(all)
})

export { categoriesRoutes }