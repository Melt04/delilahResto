const router = require('express').Router()
const { getAllOrders, createOrder } = require('../../controllers/orders')
const { validateAdminMiddleware } = require('../users/middleware')

router.get('/', validateAdminMiddleware, async (req, res, next) => {
  try {
    const result = await getAllOrders()
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    const error = new Error('Se ha producido un error inesperado')
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const result = await createOrder(req.body.Order, req.user)
    res.status(201).json({ message: 'Pedido creado' })
  } catch (e) {
    const error = new Error('Se ha producido un error inesperado')
    next(error)
  }
})
module.exports = router
