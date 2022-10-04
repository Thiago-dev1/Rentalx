import { prisma } from "../../../../database/prismaClient"

import { ICreatedRentalsDTO } from "@modules/rentals/dto/ICreatedRentalDTO"
import { IRentalsRepository } from "../IRentalsRepository"
import { Rentals } from "@prisma/client"

class RentalsRepository implements IRentalsRepository {
   
    async findOpenRentalByUser(user_id: string): Promise<Rentals> {
        const rentalByUser = await prisma.rentals.findFirst({
            where: {
                user_id
            }
        })

        return rentalByUser
    }

    async findOpenRentalByCar(car_id: string) {
        const rentalByCar = await prisma.rentals.findFirst({
            where: {
                car_id
            }
        })

        return rentalByCar
    }

    async create({ user_id, car_id, expected_return_date }: ICreatedRentalsDTO): Promise<void> {
       const test = await prisma.rentals.create({
            data: {
                user_id,
                car_id,
                expected_return_date
            }
        })
    }

}

export { RentalsRepository }