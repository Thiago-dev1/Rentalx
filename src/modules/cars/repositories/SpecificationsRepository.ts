import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[]

    constructor () {
        this.specifications= []
    }


    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            create_at: new Date()
        })

        this.specifications.push(specification)
    }

    list(): Specification[] {
        return this.specifications
    }

    findByName(name: string): Specification {
         const specification = this.specifications.find(specification => specification.name === name)
         return specification
    }   
}

export { SpecificationsRepository }