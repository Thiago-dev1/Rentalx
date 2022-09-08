import { Request, Response } from "express";
import { CreateSpeficificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpeficificationController {

    constructor(private createSpecificationUseCase: CreateSpeficificationUseCase) {}
    
    handle(req: Request, res: Response): Response {
        const { name, description } = req.body
    
        this.createSpecificationUseCase.execute({name, description})
    
        return res.status(201).send()
    }

}

export { CreateSpeficificationController }