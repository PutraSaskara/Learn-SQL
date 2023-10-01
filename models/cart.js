const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Cart = sequelize.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, 
{
    freezeTableName: true
}
)

module.exports = Cart;