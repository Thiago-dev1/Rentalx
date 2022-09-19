import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpeficificationController {

    
    handle(req: Request, res: Response): Response {
        const { name, description } = req.body

        const createSpecificationUseCase = container.resolve(CreateSpeficificationUseCase)
    
        createSpecificationUseCase.execute({name, description})
    
        return res.status(201).send()
    }

}

export { CreateSpeficificationController }