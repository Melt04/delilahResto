const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} = require('../../controllers/products')

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.json(error)
  }
})
router.get('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let product = await getProductById(id)
    res.status(201).json(product)
  } catch (error) {
    res.json(error)
  }
})
router.post('/', async (req, res) => {
  let { product } = req.body
  try {
    const createdProduct = await createProduct(product)
    return res.json(createdProduct)
  } catch (error) {
    console.log(error.stack)

    return res.json(error)
  }
  res.json(product)
})

router.delete('/:id', async (req, res) => {
  try {
    let { id } = req.params
    const deletedProduct = deleteProductById(id)
    return res.json(deletedProduct)
  } catch (error) {
    console.log(error.message)
    return res.json(error)
  }
})
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { product } = req.body

  try {
    const updadatedProduct = await updateProductById(product, id)
    res.json(updadatedProduct)
  } catch (error) {
    res.json(error)
  }
})
module.exports = router
