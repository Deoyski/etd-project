import { Sequelize } from "sequelize";

const db = new Sequelize("project_etd", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

export default db;


// import { Sequelize } from "sequelize";

// const db = new Sequelize("projecte_db_projectetd", "projecte_admin", "(tJ7Np9n*#~}", {
//     host: "103.163.138.165",
//     dialect: "mysql"
// })

// export default db;