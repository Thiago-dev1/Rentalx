import { container } from "tsyringe"

import { Request, Response } from "express"

import { UploadCarImageUseCase } from "./UploadCarImageUsecase"

interface IFifle {
    filename: string
}

class UploadCarImageController {

    async handle(req: Request, res: Response): Promise<Response> {
        const {id} = req.params
        const image = req.file as IFifle


        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

        const image_name = image.filename

        await uploadCarImageUseCase.execute({car_id:id, image_name})

        return res.status(201).send()
    }
}

export { UploadCarImageController }