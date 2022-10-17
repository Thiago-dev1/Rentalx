import { Rentals } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { IRentalsRepository } from "../../repositories/IRentalsRepository"


@injectable()
class ListRentalActiveByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rentals> {
        const rental = await this.rentalsRepository.findOpenRentalByUser(user_id)

        return rental
    }
}

export { ListRentalActiveByUserUseCase }