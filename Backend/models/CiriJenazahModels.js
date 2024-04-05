import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const CiriJenazah = db.define('cirijenazah', {
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

export default CiriJenazah; // export database CiriJenazah

(async () => {
    await db.sync();
})(); // jalankan fungsi sync() untuk membuat tabel jika belum ada