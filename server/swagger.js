const SwaggerAutogen = require('swagger-autogen')

const swaggerAutogen = SwaggerAutogen({
    language: 'pt-BR'
})

const doc = {
    info: {
        title: 'Scheduling API',
        version: '1.0.0',
        description: 'API para o sistema de agendamentos de salão de beleza'
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './app/http/routes/clients_routes.js',
    './app/http/routes/scheduling_routes.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)