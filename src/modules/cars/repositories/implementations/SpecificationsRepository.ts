import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

import {PrismaClient} from "@prisma/client"

class SpecificationsRepository {
    private prisma: any

    private static INSTANCE: SpecificationsRepository

    private constructor () {
        this.prisma = new PrismaClient()
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE){
            SpecificationsRepository.INSTANCE = new SpecificationsRepository()
        }

        return SpecificationsRepository.INSTANCE
    }

    async create({ name, description }: ICreateSpecificationDTO){
        await this.prisma.specification.create({
            data: {
                name: name,
                description: description
            }
        })
    }

    async list(){
        const specifications =  await this.prisma.specification.findMany({
            select: {
                name: true,
                description: true
            }
        })
        
        return specifications
    }

    async findByName(name: string) {
        const specification = await this.prisma.specification.findMany({
            select: {
                name: true
            },
            where: {
                name
            }
        })
        return specification.length
    }   
}

export { SpecificationsRepository }