import { inject, injectable } from "tsyringe"

import { ICarsRepository } from "../../repositories/ICarsRepository"

import { AppError } from "../../../../errors/AppError"

interface IRequest {
    car_id: string,
    specification_id: string,
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({car_id, specification_id}: IRequest):Promise<void> {
        const car = await this.carsRepository.findById(car_id)

        if(!car) {
            throw new AppError("Car not registered")
        }

        await this.carsRepository.createCarSpecification(car_id, specification_id)
    }
}

export { CreateCarSpecificationUseCase }