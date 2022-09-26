import "reflect-metadata"

import { AppError } from "../../../../errors/AppError"

import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"


let usersRepositoryInMemory:UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Autheticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory =  new UsersRepositoryInMemory(),
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory),
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    })

    it("should be possible to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            password: "12584",
            email: "user@test.com",
            driverLicense: "168732"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("should not be able to authenticate an noneexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "fake@gmail.com",
                password: "33e12c"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test Error",
                password: "12584",
                email: "user0@test.com",
                driverLicense: "10732"
            } 

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "223s13"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})