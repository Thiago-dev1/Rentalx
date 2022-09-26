import crypto from 'node:crypto';

import { Users } from "@prisma/client";

import { IUsersRepository }  from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UsersRepositoryInMemory implements IUsersRepository {
    
    public users: Users[] = []
    
    async create({driverLicense, email, name, password}: ICreateUserDTO): Promise<void> {
        this.users.push({
            id: crypto.randomUUID(),
            driverLicense,
            email,
            name,
            password,
            createdAt: new Date(),
            isAdmin: false,
            avatar: null
        })
    }

    async update(id: string, data: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<Users> {
        const user = this.users.find(e => e.email === email)

        return user
    }

    async findById(id: string): Promise<Users> {
        const user = this.users.find(e => e.id === id)
        return user
    }
}

export { UsersRepositoryInMemory }