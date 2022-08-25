const BaseError = require('../../domain/errors/baseError')
const ModelValidationError = require('../../domain/errors/modelValidationError')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('ERROR', err)
  if (err) {
    if (err instanceof ModelValidationError) {
        return res.status(err.code).json({
          code: err.code,
          message: err.message,
          errors: err.errors
        })
    }

    if (err instanceof BaseError) {
      return res.status(err.code).json({
        code: err.code,
        message: err.message
      })
    }

    return res.status(500).json({message: 'Um erro inesperado ocorreu'})
  }
  next()
}

module.exports = errorHandlerMiddleware