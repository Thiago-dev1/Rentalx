import { inject, injectable } from "tsyringe"

import { ICarsImageRepository } from "../../repositories/ICarsImageRepository"


interface IRequest {
    car_id: string,
    image_name: string
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ) {}

    async execute({car_id, image_name}: IRequest): Promise<void> {
        await this.carsImageRepository.create(car_id, image_name)
    }
}

export { UploadCarImageUseCase }