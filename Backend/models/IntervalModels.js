import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Interval = db.define('interval', {
    kode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    freezeTableName: true,
});

export default Interval; // export database Interval

(async () => {
    await db.sync();
})(); // jalankan fungsi sync() untuk membuat tabel jika belum ada