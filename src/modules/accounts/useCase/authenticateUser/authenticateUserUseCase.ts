import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"


interface IRequest {
    email: string,
    password: string,
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new Error("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email or password incorrect!")
        }

        const token = sign({},  "b0d0f0fcccf4f45e6c4474bb3d58d128", {
            subject: user.id,
            expiresIn: "1d",
        })

        const tokenReturn: IResponse ={
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }