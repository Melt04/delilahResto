const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  validateRole,
  validateLoggedUser,
} = require('../../controllers/users')
async function validateLoggedMiddleware(req, res, next) {
  let { token } = req.body
  try {
    const decodedToken = await validateLoggedUser(token)
    req.role = decodedToken.role
    next()
  } catch (error) {
    return res.send(error.message)
  }
}
function validateAdminMiddleware(req, res, next) {
  if (req.role === 2) {
    next()
  } else {
    res.json('No eres admin')
  }
}
router.post('/signup', async (req, res) => {
  const { user } = req.body
  try {
    const [results, metadata] = await createUser(user)
    console.log(results)
    return res.json(results)
  } catch (error) {
    res.json(error)
  }
})
router.get('/signin', async (req, res) => {
  const { userName, password } = req.body
  loginUser(userName, password).then((token) => {
    if (token) {
      res.send(token)
    } else {
      res.send('Datos no correctos')
    }
  })
})
router.get(
  '/hola',
  validateLoggedMiddleware,
  validateAdminMiddleware,
  (req, res) => {
    res.send('Bienvenido')
  }
)
router.get('/validate', async (req, res) => {
  const { token } = req.body
  try {
    let myToken = await validateRole(token)

    res.json(myToken)
  } catch (error) {
    res.json(error.message)
  }
})
module.exports = router
