const router = require('express').Router()
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orders')
const { validateAdminMiddleware } = require('../users/middleware')
const { validatePayload } = require('../middleware')
const orderSchema = {
  payment: 'string',
  products: 'object',
}
const updateOrderSchema = {
  newState: 'number',
}

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

router.post(
  '/',
  validatePayload(orderSchema, 'order'),
  async (req, res, next) => {
    try {
      const result = await createOrder(req.body.order, req.user)
      res.status(201).json({ message: 'Pedido creado' })
    } catch (e) {
      console.log(e)
      const error = new Error('Se ha producido un error inesperado')
      next(error)
    }
  }
)
router.delete('/:id', validateAdminMiddleware, async (req, res, next) => {
  const { id } = req.params
  try {
    const deleted = await deleteOrder(id)
    return res.status(200).json({ message: 'Pedido Borrado' })
  } catch (e) {
    console.log(e)
    const error = new Error('Se ha producido un error inesperado')
    next(error)
  }
})
router.put(
  '/:id',
  validateAdminMiddleware,
  validatePayload(updateOrderSchema, 'order'),
  async (req, res, next) => {
    const { body, params } = req
    try {
      const updatedOrder = await updateOrder(body.order, params.id)
      res.status(200).json({ message: 'Modificado con exito' })
    } catch (e) {
      const error = new Error('Se ha producido un error inesperado')
      next(error)
    }
  }
)
module.exports = router
