import "reflect-metadata"

import { AppError } from "../../../../errors/AppError";

import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"
import { CreateCarUseCase } from "../createCar/CreateCarUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase
let createCarUseCase: CreateCarUseCase

describe("List available cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to list available cars", async () => {
       const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            dailyRate: 400,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        const cars = await listAvailableCarsUseCase.execute({})
        
        expect(cars).toEqual([car])
    })

    it("should be able to list available cars by brand", async () => {
        const car = await createCarUseCase.execute({
             name: "Car2",
             description: "Description Car",
             dailyRate: 241,
             license_plate: "ABC-1234",
             fine_amount: 12,
             brand: "Car_brand_test",
             category_id: "category_id"
         })
 
         const cars = await listAvailableCarsUseCase.execute({brand: "Car_brand_test"})
         
         expect(cars).toEqual([car])
     })

     it("should be able to list available cars by category", async () => {
        const car = await createCarUseCase.execute({
             name: "Car3",
             description: "Description Car",
             dailyRate: 241,
             license_plate: "ABC-12344",
             fine_amount: 12,
             brand: "Car_brand_test",
             category_id: "category_id2"
         })
 
         const cars = await listAvailableCarsUseCase.execute({category_id: "category_id2"})
         
         expect(cars).toEqual([car])
     })

     it("should be able to list available cars by name", async () => {
        const car = await createCarUseCase.execute({
             name: "Audi",
             description: "Description Car",
             dailyRate: 241,
             license_plate: "ABC-14",
             fine_amount: 12,
             brand: "Car_brand",
             category_id: "category_id1"
         })
 
         const cars = await listAvailableCarsUseCase.execute({name: "Audi"})
         
         expect(cars).toEqual([car])
     })
})