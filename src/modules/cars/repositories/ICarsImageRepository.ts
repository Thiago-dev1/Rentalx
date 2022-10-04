import { CarsImage } from "@prisma/client"

interface ICarsImageRepository {
    create(car_id: string, image_name: string): Promise<CarsImage>
}

export { ICarsImageRepository }