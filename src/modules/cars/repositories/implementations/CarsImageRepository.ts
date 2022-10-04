import { prisma } from "../../../../database/prismaClient"

import { CarsImage } from "@prisma/client";
import { ICarsImageRepository } from "../ICarsImageRepository"

class CarsImageRepository implements ICarsImageRepository {
    async create(car_id: string, image_name: string): Promise<CarsImage> {
        const carImage = await prisma.carsImage.create({
            data: {
                car_id,
                image_name
            }
        })

        return carImage
    }

}

export { CarsImageRepository }