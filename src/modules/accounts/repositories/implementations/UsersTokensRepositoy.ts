import { UsersToken } from "@prisma/client";
import { IUsersTokensRepository } from "../IUsersTokensRepository"
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO"

import { prisma } from "../../../../database/prismaClient" 

class UsersTokensRepository implements IUsersTokensRepository {
    
    async deleteById(id: string): Promise<void> {
        await prisma.usersToken.delete({
            where: {
                id
            }
        })
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
        const userToken = await prisma.usersToken.findFirst({
            where: {
                user_id,
                refresh_token
            }
        })
        return userToken
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersToken> {
        const userToken = await prisma.usersToken.create({
            data: {
                expires_date,
                refresh_token,
                user_id
            }
        })

        return userToken
    }

}

export { UsersTokensRepository }