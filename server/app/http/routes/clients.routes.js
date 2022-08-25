const router = require('express').Router()

const validatorMiddleware = require('../middlewares/modelValidator.middleware')
const createClientsController = require('../../domain/factories/clientsControllerFactory')
const addressValidator = require('../../domain/validators/address.validator')
const clientValidator = require('../../domain/validators/client.validator')

const clientsController = createClientsController()

const clientvalidators = [
    clientValidator.name,
    clientValidator.nickname,
    addressValidator.street,
    addressValidator.number,
    addressValidator.neighborhood,
    addressValidator.zipCode,
    addressValidator.city,
    addressValidator.state,
    addressValidator.complement
]

router.post(
    '/v1/clients',
    clientvalidators,
    validatorMiddleware,
    async (req, res) => {
    /*  
        #swagger.tags = ['Clients']
        #swagger.summary = 'Cadastrar um novo cliente'
    */

    const data = req.body
    
    await clientsController.createClient(data)

    return res.status(201).end()
})

router.put(
    '/v1/clients',
    [ clientValidator.id, ...clientvalidators ],
    validatorMiddleware,
    async (req, res) => {
    /*  
        #swagger.tags = ['Clients']
        #swagger.summary = 'Atualizar um cliente'
        #swagger.description = 'Atualiza o cliente passado como parâmetro no corpo da requisição'
    */

    const data = req.body
    
    await clientsController.updateClient(data)

    return res.status(204).end()
})

router.delete('/v1/clients/:id', validatorMiddleware, async (req, res) => {
    /*  
        #swagger.tags = ['Clients']
        #swagger.summary = 'Deletar um cliente pelo ID'
    */

    const { id } = req.params
    
    await clientsController.deleteClient(id)

    return res.status(204).end()
})

router.get('/v1/clients', async (req, res) => {
    /*  
        #swagger.tags = ['Clients']
        #swagger.summary = 'Obter uma lista de clientes'
    */

    const { search } = req.query
    const clients = await clientsController.getClients(search)
    return res.json(clients)
})

router.get('/v1/clients/:id', async (req, res) => {
    /*  
        #swagger.tags = ['Clients']
        #swagger.summary = 'Obter um cliente pelo ID'
        #swagger.description = 'Retorna o cliente relacionado ao ID informado'
    */

    const { id } = req.params
    const client = await clientsController.getClientById(id)
    return res.json(client)
})

module.exports = router