const ClientsRepository = require("../repositories/clients.repository")
const ClientsController = require("../../http/controllers/clients.controller")

const createClientsController = () => {
    const repository = new ClientsRepository()
    return new ClientsController(repository)
}

module.exports = createClientsController