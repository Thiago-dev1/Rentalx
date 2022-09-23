import { Users } from "@prisma/client"
import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

import { prisma } from "../../../../database/prismaClient" 


class UsersRepository implements IUsersRepository {
   async update(id: string, data: string): Promise<void> {
        await prisma.users.update({
            where: {
                id
            },
            data: {
                avatar: data
            }
        })
    }

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

   async findByEmail(email: string): Promise<Users> {
        const user =  await prisma.users.findFirst({
            where: {
                email
            }
        })

        return user
    }

    async findById(id: string): Promise<Users> {
        const user = await prisma.users.findUnique({
            where:{
                id
            }
        })

        return user
    }
}

export { UsersRepository }