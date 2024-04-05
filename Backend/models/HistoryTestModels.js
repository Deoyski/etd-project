import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModels.js";

const { DataTypes } = Sequelize;

const History = db.define('history', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id' 
        }
    },
    no_pemeriksaan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    inisial_nama: {
        type: DataTypes.STRING,
        defaultValue: '', 
        required: true
    },
    tgl_pemeriksaan: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, 
        required: true
    },
    jenis_kelamin: {
        type: DataTypes.STRING,
        defaultValue: '', 
        required: true
    },
    perkiraan_umur: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        required: true
    },
    tgl_penemuan: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, // Menggunakan defaultValue: Sequelize.NOW untuk nilai waktu saat ini
        required: true
    },
    lokasi_penemuan: {
        type: DataTypes.STRING,
        defaultValue: '', 
    },
    informasi_tambahan: {
        type: DataTypes.STRING,
        defaultValue: '', 
    },
    ciri_jenazah: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    waktu_kematian: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

User.hasMany(History, { foreignKey: 'userId' });

export default History; 

(async () => {
    await db.sync();
})(); 
