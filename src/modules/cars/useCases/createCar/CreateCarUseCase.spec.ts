
import "reflect-metadata"
import { AppError } from "../../../../errors/AppError"

import { CreateCarUseCase } from "./CreateCarUseCase"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryInMemory

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepository)
    })

    it("should be able to create a new car", async () => {
       const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            dailyRate: 400,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car1",
                description: "Description Car",
                dailyRate: 400,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })

            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                dailyRate: 400,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            dailyRate: 400,
            license_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        expect(car.available).toBe(true)
    })
})