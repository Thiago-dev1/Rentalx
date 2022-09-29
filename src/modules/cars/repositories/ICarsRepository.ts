import { Car } from "@prisma/client"
import { ICreateCarDTO } from "../dto/ICreateCarDTO"

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findByAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>
}

export { ICarsRepository }