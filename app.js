const express = require('express')
const server = express()
const productRouter = require('./routes/products')
const userRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const { PORT } = require('./const')
const { validateLoggedMiddleware } = require('./routes/users/middleware')
const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use('/products', validateLoggedMiddleware, productRouter)
server.use('/users', userRouter)

server.use('/orders', validateLoggedMiddleware, ordersRouter)
server.use((error, req, res, next) => {
  const errorStatus = error.codeStatus || 500

  res.status(errorStatus)
  res.json({ error: error.message })
})
server.listen(PORT, () => console.log('Server running'))
