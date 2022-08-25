const BaseError = require("./baseError")

class ResourceNotFoundError extends BaseError {
    constructor(message) {
        super(404, message)
    }
}

module.exports = ResourceNotFoundError