import { Specification } from "@modules/cars/model/Specification";

interface ICreateSpecificationDTO {
    name: string,
    description: string
}

interface ISpecificationRepository {
    findByName(name: string): Specification;
    list(): Specification[];
    create({name, description}: ICreateSpecificationDTO)
}

export { ISpecificationRepository, ICreateSpecificationDTO }