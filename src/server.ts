import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import  swaggerUi  from "swagger-ui-express"
import cors from "cors"

import "./shared/container"

import { router } from "./routes"

import swaggerFile from './swagger.json'
import { AppError } from "./errors/AppError"


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server erro - ${err.message}`
    })

})

app.listen(3334, () => console.log("Server is running"))