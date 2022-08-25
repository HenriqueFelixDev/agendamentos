const { body } = require("express-validator")

const clientValidator = {
    id: body('id')
        .isNumeric().withMessage('O ID precisa ser um número')
        .exists({checkFalsy: true, checkNull: true}).withMessage('ID obrigatório'),

    name:  body('name').isLength({min: 3, max: 64})
        .withMessage('O nome deve ter entre 3 e 64 caracteres'),
        
    nickname: body('nickname').isLength({max: 32})
        .withMessage('O apelido deve ter no máximo 32 caracteres'),
}

module.exports = clientValidator