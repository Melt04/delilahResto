const Sequelize = require('sequelize').Sequelize
const sequelize = new Sequelize('mysql://root@localhost:3306/Resto')

module.exports = sequelize
