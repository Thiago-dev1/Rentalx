import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpeficificationController {

    
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body

        const createSpecificationUseCase = container.resolve(CreateSpeficificationUseCase)
    
        await createSpecificationUseCase.execute({name, description})
    
        return res.status(201).send()
    }

}

export { CreateSpeficificationController }