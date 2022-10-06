import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO"
import { Car } from "@prisma/client"
import { ICarsRepository } from "../ICarsRepository"

import { prisma } from "../../../../database/prismaClient" 


class CarsRepository implements ICarsRepository {
    
   async updateAvailable(car_id: string, available: boolean): Promise<void> {
        await prisma.car.update({
            where: {
                id: car_id
            },
            data: {
                available
            }
        })
    }

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

    async createCarSpecification(car_id: string, specification_id: string): Promise<void> {
        // verificando se já existe o carro com a especificação
        const [car] = await prisma.specificationsCars.findMany({
            where: {
                car_id,
                specification_id
            }
        })

        // se não existir irá criar...

        if(!car) {
            await prisma.specificationsCars.create({
                data: {
                    car_id,
                    specification_id
                }
            })
        }
    }

    async findById(car_id: string): Promise<Car> {
        const car = await prisma.car.findUnique({
            where: {
                id: car_id
            }
        })

        return car
    }

    async findByAvailable(brand?: string, category_id?: string, name?: string, license_plate?: string): Promise<Car[]> {
        const cars = prisma.car.findMany({
            where: {
                available: true,
                brand,
                category_id,
                name,
                license_plate
            },
            include: {
                SpecificationsCars: true
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