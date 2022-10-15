import { inject, injectable } from "tsyringe"

import { sign, verify } from "jsonwebtoken"

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"

import { AppError } from "../../../../errors/AppError"

interface IPayload {
    sub: string,
    email: string
}

interface IResponse {
    token: string,
    refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(RefreshToken: string) {
        const { email, sub } = verify(RefreshToken, process.env.SECRET_REFRESH_TOKEN) as IPayload;
        
        
        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, RefreshToken)

        if (!userToken) {
            throw new AppError("Refresh token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const newToken = sign({},  process.env.SECRET_TOKEN, {
            subject: sub,
            expiresIn: process.env.EXP_IN_TOKEN,
        })
    
        const refresh_token = sign({email}, process.env.SECRET_REFRESH_TOKEN, {
            subject: sub,
            expiresIn: process.env.EXP_IN_REFRESH_TOKEN
        })

        const refresh_token_expires_date = this.dateProvider.addDays(30)

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        const tokenReturn: IResponse = {
            token: newToken,
            refresh_token,
        }

        return tokenReturn
    }
}

export { RefreshTokenUseCase }