import { container } from "tsyringe"
import { Request, Response } from "express"

import { ListRentalActiveByUserUseCase } from "./ListRentalActiveByUserUseCase"


class ListRentalActiveByUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } =  request.user

        const listRentalsByUserUseCase = container.resolve(ListRentalActiveByUserUseCase)

        const rentals = await listRentalsByUserUseCase.execute(id)

        return response.status(200).json(rentals)
    }
}

export { ListRentalActiveByUserController }