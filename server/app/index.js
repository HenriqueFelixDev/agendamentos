require('express-async-errors')
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const swaggerUI = require('swagger-ui-express')

const errorHandlerMiddleware = require('./http/middlewares/errorHandler.middleware')
const clientsRoutes = require('./http/routes/clients.routes')
const schedulingRoutes = require('./http/routes/scheduling.routes')
const swaggerFile = require('../swagger-output.json')

const PORT = process.env.SERVER_PORT
const HOST = process.env.SERVER_HOST

const app = express()

app.use(cors())
app.use(express.json())

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.use(express.static('public'))
app.use(clientsRoutes)
app.use(schedulingRoutes)
app.use(errorHandlerMiddleware)

app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`)
})