const { body } = require('express-validator')

const schedulingValidator = {
    id: body('id')
        .isNumeric().withMessage('O ID precisa ser um número')
        .exists({checkFalsy: true, checkNull: true}).withMessage('ID obrigatório'),

    description: body('description')
        .isLength({max: 255}).withMessage('A descrição deve ter no máximo 255 caracteres')
        .exists().withMessage('A descrição é obrigatória'),

    clientId: body('client_id')
        .isNumeric().withMessage('O ID do cliente precisa ser um número')
        .exists().withMessage('O ID do cliente é obrigatório'),

    start: body('start')
        .isISO8601().withMessage('Data inválida')
        .exists().withMessage('A data de início é obrigatória'),

    end: body('end')
        .isISO8601().withMessage('Data inválida')
        .exists().withMessage('A data de término é obrigatória'),

    price: body('price')
        .isFloat({ gt: 0 }).withMessage('O preço deve ser um valor monetário válido')
        .exists().withMessage('O preço é obrigatório'),
}

module.exports = schedulingValidator