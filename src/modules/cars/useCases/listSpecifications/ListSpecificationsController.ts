import  { Request, Response } from "express"
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase"


class ListSpecificationsController {
    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

    async handle(req: Request, res: Response) {
        const specifications = await this.listSpecificationsUseCase.execute()
        return res.json(specifications)
    }
}

export { ListSpecificationsController }