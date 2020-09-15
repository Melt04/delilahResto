const { USUARIO_BD, PASSWORD_BD, NOMBRE_BD, PUERTO_BD } = require('../const')

const Sequelize = require('sequelize').Sequelize
const sequelize = new Sequelize(
  `mysql://${USUARIO_BD}:${PASSWORD_BD}@localhost:${PUERTO_BD}/${NOMBRE_BD}`
)

module.exports = sequelize
