import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import  listCategoriesController  from "../modules/cars/useCases/listCategories";
import  importCategoriesController from "../modules/cars/useCases/importCategories";


const categoriesRoutes = Router()
const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController().handle(req, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoriesController().handle(req, res)
}) 

export { categoriesRoutes }