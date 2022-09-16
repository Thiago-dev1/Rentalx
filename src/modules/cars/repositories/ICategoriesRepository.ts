import { Category } from "../model/Category";


interface ICreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string);
    list();
    create({name, description}: ICreateCategoryDTO)
}

export {ICategoriesRepository, ICreateCategoryDTO}