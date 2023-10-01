const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, 
{
    // biasanya jika sync table di database nama tabel akan berubah secara otomatis, freezeTableName berfungsi agar table name di database sesuai dengan yang kita buat
    freezeTableName: true
}
)

module.exports = User;