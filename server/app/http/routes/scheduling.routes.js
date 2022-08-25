const router = require('express').Router()

const validatorMiddleware = require('../middlewares/modelValidator.middleware')
const createSchedulingController = require('../../domain/factories/schedulingControllerFactory')
const schedulingValidator = require('../../domain/validators/scheduling.validator')


const schedulingController = createSchedulingController()

const schedulingValidators = [
    schedulingValidator.description,
    schedulingValidator.clientId,
    schedulingValidator.start,
    schedulingValidator.end,
    schedulingValidator.price,
]

router.post(
    '/v1/schedulings',
    schedulingValidators,
    validatorMiddleware,
    async (req, res) => {
    /*  
        #swagger.tags = ['Schedulings']
        #swagger.summary = 'Cadastrar um novo agendamento'
    */

    const data = req.body

    await schedulingController.createScheduling(data);

    return res.status(201).end()
})

router.put(
    '/v1/schedulings',
    [ schedulingValidator.id, ...schedulingValidators],
    validatorMiddleware,
    async (req, res) => {
    /*  
        #swagger.tags = ['Schedulings']
        #swagger.summary = 'Atualizar um agendamento'
        #swagger.description = 'Atualiza o agendamento passado como parâmetro no corpo da requisição'
    */

    const data = req.body
    
    await schedulingController.updateScheduling(data);

    return res.status(204).end()
})

router.delete('/v1/schedulings/:id', async (req, res) => {
    /*  
        #swagger.tags = ['Schedulings']
        #swagger.summary = 'Deletar um agendamento pelo ID'
    */

    const { id } = req.params
    
    await schedulingController.deleteScheduling(id);

    return res.status(204).end()
})

router.get('/v1/schedulings', async (req, res) => {
    /*  
        #swagger.tags = ['Schedulings']
        #swagger.summary = 'Obter uma lista de agendamentos'
    */

    const {
        ['initial-date']: initialDate,
        ['final-date']: finalDate
    } = req.query

    const schedulings = await schedulingController.getSchedulings({initialDate, finalDate});

    return res.json(schedulings)
})

router.get('/v1/schedulings/:id', async (req, res) => {
    /*  
        #swagger.tags = ['Schedulings']
        #swagger.summary = 'Obter um agendamento pelo ID'
        #swagger.description = 'Retorna um agendamento relacionado ao ID informado'
    */

    const { id } = req.params
    
    const scheduling = await schedulingController.getSchedulingById(id);

    return res.json(scheduling)
})


module.exports = router