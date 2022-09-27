
interface ICreateCarDTO {
    name: string;
    description: string;
    dailyRate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string | null;
}


export { ICreateCarDTO }