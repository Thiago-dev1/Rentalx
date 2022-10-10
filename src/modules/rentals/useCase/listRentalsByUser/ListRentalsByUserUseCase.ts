import { Rentals } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { IRentalsRepository } from "../../repositories/IRentalsRepository"


@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rentals[]> {
        const rentals = await this.rentalsRepository.findByUser(user_id)

        return rentals
    }
}

export { ListRentalsByUserUseCase }