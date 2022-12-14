import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, driverLicense }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new AppError("User Aldready exists")
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name, 
            email, 
            password: passwordHash, 
            driverLicense: String(driverLicense)
        })
    }
}

export { CreateUserUseCase }