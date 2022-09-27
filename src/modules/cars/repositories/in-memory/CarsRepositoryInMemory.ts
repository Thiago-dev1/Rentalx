import { Car } from "@prisma/client"

import crypto from 'node:crypto';

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
    public cars: Car[] = []

    async create(data: ICreateCarDTO): Promise<Car> {

      await this.cars.push({
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description,
            dailyRate: data.dailyRate,
            available: true,
            brand: data.brand,
            category_id: data.category_id,
            fine_amount: data.fine_amount,
            license_plate: data.license_plate,
            createdAt: new Date()
        })

        const car = await this.findByLicensePlate(data.license_plate)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.cars.find(car => car.license_plate === license_plate)

        return car
    }
}

export { CarsRepositoryInMemory }