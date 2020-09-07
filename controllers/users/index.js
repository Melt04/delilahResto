const sequelize = require('../../conexion')
const { QueryTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 5
const jwt = require('jsonwebtoken')
const { MY_SECRET_TOKEN } = require('../../const')

function createUser({ userName, password, name, email, phoneNumber, address }) {
  bcrypt.hash(password, saltRounds, (error, data) => {
    console.log(data)
    password = data
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
  })
}

function loginUser(userName, password) {
  return sequelize
    .query(
      'Select password ,role,user_name from users where user_name=:userName',
      {
        replacements: {
          userName,
        },
        type: QueryTypes.SELECT,
      }
    )
    .then(([user]) => {
      return bcrypt.compare(password, user.password).then((same) => {
        if (same) {
          return jwt.sign(
            { role: user.role, user: user.user_name },
            MY_SECRET_TOKEN
          )
        } else {
          return null
        }
      })
    })
}

function validateLoggedUser(token) {
  return jwt.verify(token, MY_SECRET_TOKEN)
}

function validateRole(token) {
  return jwt.verify(token, MY_SECRET_TOKEN, function (err, { role }) {
    return sequelize.query('SELECT role_name from roles WHERE id=:role', {
      replacements: { role },
      type: QueryTypes.SELECT,
    })
  })
}

module.exports = { createUser, loginUser, validateRole, validateLoggedUser }
