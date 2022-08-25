const knexFile = require('../../../knexfile')
const db = require('knex')(knexFile.development)

module.exports = db