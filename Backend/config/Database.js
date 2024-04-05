import { Sequelize } from "sequelize";

const db = new Sequelize("project_etd", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;