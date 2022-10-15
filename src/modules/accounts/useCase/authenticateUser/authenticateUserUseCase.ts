import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"

import { AppError } from "../../../../errors/AppError";


interface IRequest {
    email: string,
    password: string,
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect!", 401)
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new  AppError("Email or password incorrect!", 401)
        }

        const token = sign({},  process.env.SECRET_TOKEN, {
            subject: user.id,
            expiresIn: process.env.EXP_IN_TOKEN,
        })

        const refresh_token = sign({email}, process.env.SECRET_REFRESH_TOKEN, {
            subject: user.id,
            expiresIn: process.env.EXP_IN_REFRESH_TOKEN
        })

        const refresh_token_expires_date = this.dateProvider.addDays(30)

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }