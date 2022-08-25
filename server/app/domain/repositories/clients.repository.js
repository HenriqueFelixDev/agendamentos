const db = require("../database/database")
const ResourceNotFoundError = require('../errors/resourceNotFoundError')

const _mapClientModel = client => ({
    id: client.id,
    name: client.name,
    nickname: client.nickname,
    address: {
        id: client.address_id,
        street: client.street,
        number: client.number,
        neighborhood: client.neighborhood,
        zip_code: client.zip_code,
        city: client.city,
        state: client.state,
        complement: client.complement,
    }
})

const _getClientsQuery = () => {
    return db.select([
        'clients.id',
        'clients.name',
        'clients.nickname',
        'addresses.street',
        'addresses.number',
        'addresses.neighborhood',
        'addresses.zip_code',
        'addresses.city',
        'addresses.state',
        'addresses.complement'
    ]).table('clients')
      .join('addresses', 'clients.address_id', '=', 'addresses.id')
}

const _getDBAddress = client => {
    return {
        street: client.address.street,
        number: client.address.number,
        neighborhood: client.address.neighborhood,
        zip_code: client.address.zip_code,
        city: client.address.city,
        state: client.address.state,
        complement: client.address.complement
    }
}

const _getDDClient = (client) => {
    return {
        name: client.name,
        nickname: client.nickname
    }
}

class ClientsRepository {
    async createClient(client) {
        const address = _getDBAddress(client)
        const [addressId] = await db.insert(address).into('addresses')
        
        const dbClient = _getDDClient(client)
        dbClient.address_id = addressId
        await db.insert(dbClient).into('clients')
    }

    async updateClient(client) {
        const { address_id } = await db
            .select('address_id')
            .from('clients')
            .where({id: client.id})
            .first()

        const address = _getDBAddress(client)
        await db('addresses')
            .where({id: address_id})
            .update(address)
        
        const dbClient = _getDDClient(client)
        await db('clients')
            .where({id: client.id})
            .update(dbClient)
    }

    async deleteClient(id) {
        const { address_id } = await db
            .select('address_id')
            .from('clients')
            .where({ id })
            .first()

        await db('clients')
            .where({ id })
            .del()

        await db('addresses')
            .where({id: address_id})
            .del()
    }

    async getClients(search) {
        const clients = await _getClientsQuery()
            .where(builder => {
                if (search) {
                    builder.where('clients.name', 'like', `%${search}%`)
                }
            })

        return clients.map(_mapClientModel)
    }

    async getClientById(id) {
        const client = await _getClientsQuery()
            .where({ 'clients.id': id })
            .first()

        if (!client) {
            throw new ResourceNotFoundError('Cliente não encontrado')
        }

        return client && _mapClientModel(client)
    }
}

module.exports = ClientsRepository