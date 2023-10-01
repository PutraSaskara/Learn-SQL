const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const cartItem = sequelize.define('cartitems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        // allowNull: true
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    prod_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, 
{
    freezeTableName: true
}
)

module.exports = cartItem;   