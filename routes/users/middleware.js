const jwt = require('jsonwebtoken')

function validateLoggedUser(token) {
  return jwt.verify(token, MY_SECRET_TOKEN)
}
async function validateLoggedMiddleware(req, res, next) {
  try {
    const headerToken = req.headers.authorization
    if (headerToken) {
      const token = headerToken.split(' ')[1]
      const decodedToken = await validateLoggedUser(token)
      req.role = decodedToken.role
      req.user = decodedToken.user
      next()
    } else {
      const error = new Error('Debes estar logeado para acceder')
      error.codeStatus = 403
      next(error)
    }
  } catch (e) {
    const error = new Error(e)
    next(error)
  }
}
function validateAdminMiddleware(req, res, next) {
  if (req.role === 2) {
    next()
  } else {
    const error = new Error('Solo los administradores pueden acceder')
    error.codeStatus = 403
    next(error)
  }
}

module.exports = { validateLoggedMiddleware, validateAdminMiddleware }
