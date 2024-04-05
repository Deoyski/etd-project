import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    email: {
        type: DataTypes.STRING,                               
        allowNull: false,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    }
}, {
    freezeTableName: true,
});

export default User; // export database User

(async () => {
    await db.sync();
})(); // jalankan fungsi sync() untuk membuat tabel jika belum ada