import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    create({name, description}: ICreateSpecificationDTO): Promise<void>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }