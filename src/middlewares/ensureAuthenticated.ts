import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepoitory"

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")


    try {
        const { sub: user_id } = verify(token, "b0d0f0fcccf4f45e6c4474bb3d58d128") as IPayload

        const usersRepository = new UsersRepository()

        const user = usersRepository.findById(user_id)

        if(!user) {
            throw new Error("User does not exists!")
        }

        next()
    } catch {
        throw new Error("Invalid token!")
    }
}