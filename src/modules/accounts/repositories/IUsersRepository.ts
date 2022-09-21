import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { Users } from "@prisma/client"

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<Users>
    findById(id: string): Promise<Users>
}

export { IUsersRepository }