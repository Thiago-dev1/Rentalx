import { Specification } from "../../entities/Specification";
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
        const specifications =  await prisma.specification.findMany({
            select: {
                name: true,
                description: true
            }
        })
        
        return specifications
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await prisma.specification.findFirst({
            select: {
                name: true
            },
            where: {
                name
            }
        })
        return specification
    }   
}

export { SpecificationsRepository }