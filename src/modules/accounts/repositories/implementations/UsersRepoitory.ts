import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

import { prisma } from "../../../../database/prismaClient" 

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

}

export { UsersRepository }