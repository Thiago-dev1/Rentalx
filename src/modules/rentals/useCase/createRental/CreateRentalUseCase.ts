import { inject, injectable } from "tsyringe"

import { ICreatedRentalsDTO } from "../../dto/ICreatedRentalDTO"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"

import { AppError } from "../../../../errors/AppError"



@injectable() 
class CreateRentalUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute ({ user_id, car_id, expected_return_date}: ICreatedRentalsDTO): Promise<void> {
        const mininumHourt = 24
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if(carUnavailable) {
            throw new AppError("Car is unavailable")
        }
        
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!")
        }
        

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
          );
      

        if(compare < mininumHourt) {
            throw new AppError("Invalid return time!")
        }

        await this.rentalsRepository.create({
            user_id, car_id, expected_return_date
        })  

        await this.carsRepository.updateAvailable(car_id, false)
    }
}

export { CreateRentalUseCase }