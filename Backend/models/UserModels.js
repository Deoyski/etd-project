import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    username: {
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
        required: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        required: true
    }
}, {
    freezeTableName: true,
});

// Hook to hash password before saving to database
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

export default User; // export database User

(async () => {
    await db.sync();
})(); // jalankan fungsi sync() untuk membuat tabel jika belum ada
