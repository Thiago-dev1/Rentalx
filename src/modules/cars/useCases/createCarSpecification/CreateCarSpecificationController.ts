import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<void> {
        const { car_id, specification_id } = request.body

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

        await createCarSpecificationUseCase.execute({car_id, specification_id})

        response.status(201).send()
    }
}

export { CreateCarSpecificationController }