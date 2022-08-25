class ClientsController {
    constructor(clientsRepository) {
        this.clientsRepository = clientsRepository
    }

    async createClient(client) {
        await this.clientsRepository.createClient(client)
    }

    async updateClient(client) {
        await this.clientsRepository.updateClient(client)
    }

    async deleteClient(id) {
        await this.clientsRepository.deleteClient(id)
    }

    getClients(search) {
        return this.clientsRepository.getClients(search)
    }

    async getClientById(id) {
        return this.clientsRepository.getClientById(id)
    }
}

module.exports = ClientsController