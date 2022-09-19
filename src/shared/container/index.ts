import { container } from "tsyringe"

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"

container.registerSingleton<CategoriesRepository> (
    "CategoriesRepository",
    CategoriesRepository
)


container.registerSingleton<SpecificationsRepository> (
    "SpecificationsRepository",
    SpecificationsRepository
)