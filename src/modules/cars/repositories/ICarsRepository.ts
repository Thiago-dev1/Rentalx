import { Car } from "@prisma/client"
import { ICreateCarDTO } from "../dto/ICreateCarDTO"

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findByAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>
    createCarSpecification(car_id: string, specification_id: string): Promise<void>
    findById(car_id: string): Promise<Car>
    updateAvailable(car_id: string, available: boolean): Promise<void>
}

export { ICarsRepository }