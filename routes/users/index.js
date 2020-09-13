const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  validateLoggedUser,
} = require('../../controllers/users')
router.post('/signup', async (req, res, next) => {
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
})
router.get('/signin', async (req, res, next) => {
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
})

module.exports = router
