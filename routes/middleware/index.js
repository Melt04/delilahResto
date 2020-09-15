module.exports.validatePayload = (fields, entity) => {
  return (req, res, next) => {
    const body = req.body[entity]
    const error = new Error('Debe enviar los datos requeridos')
    error.codeStatus = 400
    if (body === undefined) {
      next(error)
    } else {
      const fieldsKey = Object.keys(fields)
      const keysBody = Object.keys(body)
      if (keysBody.length !== fieldsKey.length) {
        next(error)
      }

      const sameKeys = keysBody.every((key) => {
        const exist = fieldsKey.find((field) => field === key)
        const type = typeof body[key] === fields[key]
        console.log(typeof body[key])

        return exist && type
      })
      if (!sameKeys) {
        next(error)
      }
      next()
    }
  }
}
