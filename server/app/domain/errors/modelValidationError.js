const BaseError = require("./baseError")

class ModelValidationError extends BaseError {
    constructor(message, errors) {
        super(400, message)
        this.errors = errors
    }
}

module.exports =  ModelValidationError