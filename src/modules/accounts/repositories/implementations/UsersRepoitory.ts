import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

import { prisma } from "../../../../database/prismaClient" 
import { User } from "@modules/accounts/entities/User"

class UsersRepository implements IUsersRepository {

   async create({name, email, password, driverLicense}: ICreateUserDTO): Promise<void> {
        await prisma.users.create({
            data: {
                name, 
                email, 
                password, 
                driverLicense
            }
        })
    }

   async findByEmail(email: string): Promise<User> {
        const user =  await prisma.users.findFirst({
            select: {
                email: true
            },
            where: {
                email
            }
        })

        return user
    }
}

export { UsersRepository }