const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce1', "user2", "123",
{
    dialect: "mysql",
    host: "localhost",
}
)

module.exports = sequelize;
