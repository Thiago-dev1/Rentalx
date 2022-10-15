import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepoitory"
import { UsersTokensRepository } from "../modules/accounts/repositories/implementations/UsersTokensRepositoy"
import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization
    

    const usersTokensRepository = new UsersTokensRepository()

    if (!authHeader) {
        throw new AppError("Token missing")
    }

    const [, token] = authHeader.split(" ")


    try {
        const { sub: user_id } = verify(token, process.env.SECRET_TOKEN) as IPayload

        // const user = usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        // if(!user) {
        //     throw new AppError("User does not exists!")
        // }

        req.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError("Token expired", 401)
    }
}