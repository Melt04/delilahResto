const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} = require('../../controllers/products')
const { validateAdminMiddleware } = require('../../routes/users/middleware')

router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts()
    res.status(200).json(products)
  } catch (err) {
    const error = new Error('Se ha produdico un error inesperado')
    next(error)
  }
})
router.get('/:id', validateAdminMiddleware, async (req, res) => {
  let { id } = req.params
  try {
    let product = await getProductById(id)
    res.status(201).json(product)
  } catch (err) {
    const error = new Error('Se ha produdico un error inesperado')
    next(error)
  }
})
router.post('/', validateAdminMiddleware, async (req, res, next) => {
  let { product } = req.body
  try {
    const createdProduct = await createProduct(product)
    return res.status(201).json({ message: 'Producto creado' })
  } catch (err) {
    const error = new Error('Se ha produdico un error inesperado')
    next(error)
  }
})

router.delete('/:id', validateAdminMiddleware, async (req, res, next) => {
  try {
    let { id } = req.params
    const deletedProduct = await deleteProductById(id)
    res.status(200).json({ message: 'Borrado con exito' })
  } catch (err) {
    const error = new Error('Se ha produdico un error inesperado')
    next(error)
  }
})
router.put('/:id', validateAdminMiddleware, async (req, res, next) => {
  const { id } = req.params
  const { product } = req.body
  try {
    const updadatedProduct = await updateProductById(product, id)
    res.status(200).json({ message: 'Producto actualizdo' })
  } catch (error) {
    res.json(error)
  }
})
module.exports = router
