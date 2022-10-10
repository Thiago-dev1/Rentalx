import { Rentals } from "@prisma/client"

import { ICreatedRentalsDTO } from "../dto/ICreatedRentalDTO"


interface IRentalsRepository {
    create({user_id, car_id, expected_return_date}:ICreatedRentalsDTO): Promise<void>
    findOpenRentalByUser(user_id: string): Promise<Rentals>
    findOpenRentalByCar(car_id: string): Promise<Rentals>
    findById(id: string): Promise<Rentals>
    findByUser(user_id: string): Promise<Rentals[]>
    updateRental(id: string,end_date: Date, total: number): Promise<Rentals>
}

export { IRentalsRepository }