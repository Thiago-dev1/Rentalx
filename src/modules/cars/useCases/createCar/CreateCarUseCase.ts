import { inject, injectable } from "tsyringe"
import { Car } from "@prisma/client"

import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ICreateCarDTO } from "../../dto/ICreateCarDTO"

import { AppError } from "../../../../errors/AppError"

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({name, description, dailyRate, license_plate, fine_amount, brand, category_id}: ICreateCarDTO): Promise<Car> {
        
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)
       
        if (carAlreadyExists) {
            throw new AppError("Car already exists!")
        }

        const car = await this.carsRepository.create({
            name, description, dailyRate, license_plate, fine_amount, brand, category_id
        })

        return car
    }
}

export { CreateCarUseCase }