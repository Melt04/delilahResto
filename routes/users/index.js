const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  getAllusers,
  getUserById,
  hasFavorite,
  addFavorite,
  addAdmin,
} = require('../../controllers/users')
const {
  validateLoggedMiddleware,
  validateAdminMiddleware,
} = require('./middleware')
const { validatePayload } = require('../middleware')
const userSchema = {
  userName: 'string',
  name: 'string',
  email: 'string',
  password: 'string',
  phoneNumber: 'string',
  address: 'string',
}
const loginSchema = {
  userName: 'string',
  password: 'string',
}

router.post(
  '/signup',
  validatePayload(userSchema, 'user'),
  async (req, res, next) => {
    const { user } = req.body
    try {
      const results = await createUser(user)
      if (!results) {
        const error = new Error('Se ha producido un error al crear el usuario')
        next(error)
      }
      return res.json({ message: 'Usuario Creado' })
    } catch (e) {
      const error = new Error('Se ha producido un error al crear el usuario')
      next(error)
    }
  }
)
router.post(
  '/favorites/:id',
  validateLoggedMiddleware,
  async (req, res, next) => {
    const { user } = req
    const { id } = req.params
    try {
      await hasFavorite(user)
      const favorite = addFavorite(user, id)
      res.status(201).json({ message: 'Favorito agregado' })
    } catch (err) {
      const error = new Error('Se ha producido un error al crear el usuario')
      next(error)
    }
  }
)
router.get('/profile', validateLoggedMiddleware, async (req, res) => {
  const { user } = req
  const userData = await getUserById(user)
  res.json(userData)
})
router.post(
  '/:user/admin',
  validateLoggedMiddleware,
  validateAdminMiddleware,
  async (req, res, next) => {
    const { user } = req.params
    try {
      const userAdmin = await addAdmin(user)
      res.status(200).json({ message: 'Modificado con exito' })
    } catch (err) {
      console.log(err)
      const error = new Error('Se ha producido un error al crear el usuario')
      next(error)
    }
  }
)
router.post(
  '/signin',
  validatePayload(loginSchema, 'user'),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body.user
      const token = await loginUser(userName, password)
      if (token) {
        res.json({ token })
      } else {
        const error = new Error('Credenciales incorrectas')
        error.codeStatus = 403
        next(error)
      }
    } catch (e) {
      const error = new Error('Credenciales incorrectas')
      error.codeStatus = 403
      next(error)
    }
  }
)
router.get(
  '/',
  validateLoggedMiddleware,
  validateAdminMiddleware,
  async (req, res, next) => {
    try {
      const users = await getAllusers()
      res.status(200).json(users)
    } catch (e) {
      const error = new Error('Credenciales incorrectas')
      error.codeStatus = 403
      next(error)
    }
  }
)

module.exports = router
