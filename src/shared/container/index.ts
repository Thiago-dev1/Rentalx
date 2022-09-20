import { container } from "tsyringe"

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"


import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"


import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepoitory"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"

container.registerSingleton<ICategoriesRepository> (
    "CategoriesRepository",
    CategoriesRepository
)


container.registerSingleton<ISpecificationsRepository> (
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
)