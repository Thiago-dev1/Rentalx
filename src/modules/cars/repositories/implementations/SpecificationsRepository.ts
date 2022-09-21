import { Specification } from "@prisma/client"
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

import { prisma } from "../../../../database/prismaClient" 

class SpecificationsRepository implements ISpecificationsRepository {


    async create({ name, description }: ICreateSpecificationDTO) : Promise<void>{
        await prisma.specification.create({
            data: {
                name: name,
                description: description
            }
        })
    }

    async list(): Promise<Specification[]>{
        const specifications =  await prisma.specification.findMany({})
        
        return specifications
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await prisma.specification.findFirst({
            where: {
                name
            }
        })
        return specification
    }   
}

export { SpecificationsRepository }