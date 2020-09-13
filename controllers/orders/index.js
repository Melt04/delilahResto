const sequelize = require('../../conexion')
const { QueryTypes } = require('sequelize')

async function getDescriptionAndPrice(products) {
  const idProducts = products.map((product) => product.id)
  const result = await sequelize.query(
    'Select id, price,product_name from products where id in (:id)',
    {
      replacements: {
        id: idProducts,
      },
      type: QueryTypes.SELECT,
    }
  )
  const fields = result.reduce(
    (acc, product, index) => {
      const { id, price } = product
      const { qty } = products.find((product) => product.id === id)
      console.log('Numerk:' + index)
      acc.price = acc.price + price * qty
      acc.product_name =
        acc.product_name + ` ${product.product_name} x ${qty}  `
      return acc
    },
    { price: 0, product_name: '' }
  )

  return fields
}

function getAllOrders() {
  return sequelize.query(
    'select orders.*,states.state_name,users.user_name  from orders join states on orders.id_state=states.id  join users on users.id=orders.id_user',
    {
      type: QueryTypes.SELECT,
    }
  )
}
async function createOrder(order, id_user) {
  const { products, payment } = order
  const { price, product_name } = await getDescriptionAndPrice(products)
  const [idInsertedOrder] = await sequelize.query(
    'Insert into orders(id_user,total_price,payment,description)values(:user,:price,:payment,:description)',
    {
      replacements: {
        user: id_user,
        payment,
        price,
        description: product_name,
      },
      type: QueryTypes.INSERT,
    }
  )
  products.forEach(async (product) => {
    const orderProductInserted = await sequelize.query(
      ' Insert into orderProducts(id_order,id_product) values (:idOrder,:idProduct) ',
      {
        replacements: {
          idOrder: idInsertedOrder,
          idProduct: product.id,
        },
      }
    )
  })
}

module.exports = { getAllOrders, createOrder }
