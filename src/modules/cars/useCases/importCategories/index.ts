import { ImportCategoriesController } from "./importCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";


const importCategoriesUseCase = new ImportCategoriesUseCase()
const importCategoriesController = new ImportCategoriesController(importCategoriesUseCase)

export { importCategoriesController }