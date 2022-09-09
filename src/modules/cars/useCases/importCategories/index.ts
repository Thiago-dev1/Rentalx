import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./importCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance()
const importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRepository)
const importCategoriesController = new ImportCategoriesController(importCategoriesUseCase)

export { importCategoriesController }