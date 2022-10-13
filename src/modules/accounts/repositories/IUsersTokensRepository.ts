import { UsersToken } from "@prisma/client"
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"


interface IUsersTokensRepository {
    create ({expires_date, refresh_token, user_id}: ICreateUserTokenDTO): Promise<UsersToken>
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>
    deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }