const express = require('express')
const server = express()

const productRouter = require('./routes/products')
const userRouter = require('./routes/users')

const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use('/products', productRouter)
server.use('/users', userRouter)
server.listen(3000, () => console.log('Server running'))
