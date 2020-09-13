const express = require('express')
const server = express()
const productRouter = require('./routes/products')
const userRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const { validateLoggedUser } = require('./controllers/users')

const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use('/products', validateLoggedUser, productRouter)
server.use('/users', userRouter)
server.use('/orders', ordersRouter)
server.listen(3000, () => console.log('Server running'))
