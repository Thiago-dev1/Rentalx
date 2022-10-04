import { Rentals } from "@prisma/client"

import { ICreatedRentalsDTO } from "../dto/ICreatedRentalDTO"


interface IRentalsRepository {
    create({user_id, car_id, expected_return_date}:ICreatedRentalsDTO): Promise<void>
    findOpenRentalByUser(user_id: string): Promise<Rentals>
    findOpenRentalByCar(car_id: string): Promise<Rentals>
}

export { IRentalsRepository }