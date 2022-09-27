import { Car } from "@prisma/client"
import { ICreateCarDTO } from "../dto/ICreateCarDTO"

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }