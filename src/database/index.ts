import { DataSource } from "typeorm"

const AppDataSource  = new DataSource({
    type: "postgres",
    host: "database_ignite",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [],
    migrations: ['./migrations/'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

