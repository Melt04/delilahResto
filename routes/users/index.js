const express = require('express')
const { Router } = require('express')
const router = express.Router()

const { createUser } = require('../../controllers/users')

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
router.get('/signin', (req, res) => {
  res.send('Login')
})

module.exports = router
