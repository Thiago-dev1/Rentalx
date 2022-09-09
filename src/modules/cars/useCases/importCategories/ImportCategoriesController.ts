import { Request, Response } from "express"


class ImportCategoriesController {

    handle(req: Request, res: Response) {
        const { file } = req
        console.log(file)
    
        return res.send()
    }
}

export { ImportCategoriesController }