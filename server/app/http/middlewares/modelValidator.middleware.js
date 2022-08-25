const { validationResult } = require('express-validator')

const ModelValidationError = require('../../domain/errors/modelValidationError')

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const errorEntries = errors
            .array()
            .map(err => [
                err.param, 
                { message: err.msg, value: err.value }
            ])

        const formattedErrors = Object.fromEntries(errorEntries)
        throw new ModelValidationError('Dados inválidos', formattedErrors)
    }

    next()
}

module.exports = validatorMiddleware