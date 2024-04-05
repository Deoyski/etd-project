import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Interval from "./IntervalModels.js";
import CiriJenazah from "./CiriJenazahModels.js";


const { DataTypes } = Sequelize;

const RuleBase = db.define('rulebases', {
    intervalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required:true,
        references: {
            model: Interval,
            key: 'id' // Nama kolom yang menjadi primary key di model Interval
        }
    },
    ciriJenazahId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required:true,
        references: {
            model: CiriJenazah,
            key: 'id' // Nama kolom yang menjadi primary key di model Interval
        }
    },
}, {
    freezeTableName: true,
});

Interval.hasMany(RuleBase, { foreignKey: 'intervalId' });
CiriJenazah.hasMany(RuleBase, { foreignKey: 'ciriJenazahId' });

export default RuleBase; // export database RuleBase

(async () => {
    await db.sync();
})(); // jalankan fungsi sync() untuk membuat tabel jika belum ada