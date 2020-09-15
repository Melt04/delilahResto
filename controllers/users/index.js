const sequelize = require('../../conexion')
const { QueryTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const { saltRounds } = require('../../const')
const jwt = require('jsonwebtoken')
const { MY_SECRET_TOKEN } = require('../../const')

async function createUser({
  userName,
  password,
  name,
  email,
  phoneNumber,
  address,
}) {
  const hashedPassowrd = await bcrypt.hash(password, saltRounds)
  return sequelize.query(
    'INSERT INTO users (user_name,password,name,email,phone_number,address) values         (:userName,:password,:name,:email,:phoneNumber,:address)',
    {
      replacements: {
        userName,
        password: hashedPassowrd,
        name,
        phoneNumber,
        address,
        email,
      },
    }
  )
}

async function loginUser(userName, password) {
  return sequelize
    .query(
      'Select id,password ,role,user_name from users where user_name=:userName',
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
          return jwt.sign({ role: user.role, user: user.id }, MY_SECRET_TOKEN)
        } else {
          return null
        }
      })
    })
    .catch(() => {
      return null
    })
}

function getAllusers() {
  return sequelize.query('Select * from users', { type: QueryTypes.SELECT })
}
function getUserById(id) {
  return sequelize.query(
    'Select user_name,name,email,phone_number,address from users where id=:id',
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    }
  )
}
function hasFavorite(id) {
  return sequelize.query('UPDATE users SET has_favorite=1 where id=:id', {
    replacements: { id },
  })
}
function addAdmin(id) {
  return sequelize.query('Update users SET role=2 where id=:id', {
    replacements: { id },
  })
}
function addFavorite(id, idProduct) {
  return sequelize.query(
    'INSERT INTO favorites(id_user,id_product)values(:id,:idProduct)',
    {
      replacements: {
        id,
        idProduct,
      },
    }
  )
}
module.exports = {
  createUser,
  loginUser,
  getAllusers,
  getUserById,
  addFavorite,
  hasFavorite,
  addAdmin,
}
