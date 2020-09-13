const router = require('express').Router()
const { getAllOrders, createOrder } = require('../../controllers/orders')

router.get('/', async (req, res) => {
  const result = await getAllOrders()
  res.json(result)
})
router.post('/', async (req, res) => {
  const result = await createOrder(req.body.Order)
  res.json(result)
})
module.exports = router
