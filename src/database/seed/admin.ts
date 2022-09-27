import { prisma } from "../prismaClient"

import { hash } from "bcrypt"


async function create() {
    const password = await hash("admin", 8)

    await prisma.users.create({
        data: {
            name: "admin",
            email: "admin@rentx.com.br",
            password,
            driverLicense: "121123",
            isAdmin: true
        }
    })

    await prisma.$disconnect()
}

create().then(() => console.log("User admin created!"))