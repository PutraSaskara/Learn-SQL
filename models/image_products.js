const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ImageProduct = sequelize.define('images_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    width: {
        type: Sequelize.INTEGER,
        // allowNull: true
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updateAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
}, 
{
    freezeTableName: true
}
)

module.exports = ImageProduct;   