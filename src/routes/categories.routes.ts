import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController }  from "../modules/cars/useCases/listCategories/ListCategoiresController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const categoriesRoutes = Router()
const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import",ensureAuthenticated, ensureAdmin,  upload.single("file"), importCategoriesController.handle) 

export { categoriesRoutes }