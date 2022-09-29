import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO"
import { Car } from "@prisma/client"
import { ICarsRepository } from "../ICarsRepository"

import { prisma } from "../../../../database/prismaClient" 


class CarsRepository implements ICarsRepository {
    
    async create(data: ICreateCarDTO): Promise<Car> {
        const car = await prisma.car.create({
            data: {
                name: data.name,
                description: data.description,
                brand: data.brand,
                dailyRate: data.dailyRate,
                fine_amount: data.fine_amount,
                license_plate: data.license_plate,
                category_id: data.category_id
            }
        })

        return car
    }

    async findByAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const cars = prisma.car.findMany({
            where: {
                available: true,
                brand,
                category_id,
                name
            }
        })

        return cars
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await prisma.car.findFirst({
            where: {
                license_plate
            }
        })

        return car
    }

}


export { CarsRepository }