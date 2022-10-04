import { container } from "tsyringe"

import "../providers/index"

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"


import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"


import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepoitory"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"

import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository"

import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImageRepository"
import { CarsImageRepository } from "../../modules/cars/repositories/implementations/CarsImageRepository"

import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "../../modules/rentals/repositories/implementations/RentalsRepository"

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

container.registerSingleton<ICarsRepository> (
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImageRepository> (
    "CarsImageRepository",
    CarsImageRepository
)

container.registerSingleton<IRentalsRepository> (
    "RentalsRepository",
    RentalsRepository
)