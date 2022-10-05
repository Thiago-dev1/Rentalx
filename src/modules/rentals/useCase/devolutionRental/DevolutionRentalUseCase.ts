import { Rentals } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { IRentalsRepository } from "../../repositories/IRentalsRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"


import { AppError } from "../../../../errors/AppError"

interface IRequest {
    id: string,
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}


    async execute({id, user_id}: IRequest): Promise<Rentals> {
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)

        if(!rental) {
            throw new AppError("Rental does not exists!")
        }

        let daily = this.dateProvider.compareInDays(
            rental.stard_dte,
            this.dateProvider.dateNow()
        )

        if(daily <= 0) {
            daily = 1
        }

        const delay = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(),
            rental.expected_return_date
        )
        
        let total = 0
        if(delay > 0) {
            const calculate_fine = daily * car.fine_amount
            total = calculate_fine
        }
        
        total +=  daily * car.dailyRate

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total
        const updateRental =  await this.rentalsRepository.updateRental(id, rental.end_date, rental.total)
        await this.carsRepository.updateAvailable(car.id, true)

        return updateRental
    }   
}

export { DevolutionRentalUseCase }