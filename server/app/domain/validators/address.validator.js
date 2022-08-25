const { body } = require("express-validator")

const addressValidator = {
    id: body('address.id')
        .isNumeric().withMessage('O ID precisa ser um número')
        .exists({checkFalsy: true, checkNull: true}).withMessage('ID obrigatório'),

    street: body('address.street').isLength({min: 3, max: 64})
        .withMessage('O logradouro deve ter entre 3 e 64 caracteres'),

    number: body('address.number').isLength({min: 1, max: 8})
        .withMessage('O número é obrigatório e deve ter no máximo 8 caracteres'),

    neighborhood: body('address.neighborhood').isLength({min: 3, max: 64})
        .withMessage('O bairro deve ter entre 3 e 64 caracteres'),

    zipCode: body('address.zip_code').matches(/\d{2}.?\d{3}-?\d{3}/)
        .withMessage('CEP inválido. Um valor válido tem o formato 00.000-000'),

    city: body('address.city').isLength({min: 3, max: 32})
        .withMessage('A cidade deve ter entre 3 e 32 caracteres'),

    state: body('address.state').isLength({min: 2, max: 2})
        .withMessage('O estado deve ter 2 caracteres (sigla)'),
        
    complement: body('address.complement').isLength({max: 255})
        .withMessage('O complemento deve ter no máximo 255 caracteres'),
}

module.exports = addressValidator