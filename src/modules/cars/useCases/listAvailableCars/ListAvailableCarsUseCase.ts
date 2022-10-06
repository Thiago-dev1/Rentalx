import { Car } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { ICarsRepository } from "../../repositories/ICarsRepository"

import { AppError } from "../../../../errors/AppError"


interface IRequest {
    brand?: string,
    category_id?: string,
    name?: string
    license_plate?: string
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({brand, category_id, name, license_plate}: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findByAvailable(brand, category_id, name, license_plate)

        if(cars.length === 0) {
            throw new AppError("No car found")
        }

        return cars
    }
}

export { ListAvailableCarsUseCase }