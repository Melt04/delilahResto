const sequelize = require('../../conexion')
const { QueryTypes } = require('sequelize')

function getAllProducts() {
  return sequelize.query('Select * from products', { type: QueryTypes.SELECT })
}

function getProductById(id) {
  return sequelize.query('SELECT * from products WHERE ID= :id', {
    replacements: { id },
    type: QueryTypes.SELECT,
  })
}
function deleteProductById(id) {
  return sequelize.query('Delete from products WHERE ID= :id', {
    replacements: { id },
    type: QueryTypes.DELETE,
  })
}
function createProduct({ name, price, description, thumbnail }) {
  return sequelize.query(
    'INSERT INTO products (product_name,price,description,thumbnail) values(:name,:price,:description,:thumbnail)',
    {
      replacements: {
        name,
        price,
        description,
        thumbnail,
      },
      type: QueryTypes.INSERT,
    }
  )
}
function updateProductById({ name, price, description, thumbnail }, id) {
  return sequelize.query(
    'UPDATE products SET product_name=:name,price=:price,description=:description ,thumbnail=:thumbnail where ID=:id',
    {
      replacements: {
        name,
        price,
        description,
        thumbnail,
        id,
      },
      type: QueryTypes.UPDATE,
    }
  )
}

module.exports = {
  getAllProducts,
  updateProductById,
  deleteProductById,
  createProduct,
  getProductById,
}
