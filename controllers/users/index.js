const sequelize = require('../../conexion')
const { QueryTypes } = require('sequelize')

function createUser({ userName, password, name, email, phoneNumber, address }) {
  return sequelize.query(
    'INSERT INTO users (user_name,password,name,email,phone_number,address) values         (:userName,:password,:name,:email,:phoneNumber,:address)',
    {
      replacements: {
        userName,
        password,
        name,
        phoneNumber,
        address,
        email,
      },
    }
  )
}

module.exports = { createUser }
