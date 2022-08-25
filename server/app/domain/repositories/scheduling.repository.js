const db = require("../database/database");
const ResourceNotFoundError = require('../errors/resourceNotFoundError')

function formatScheduling(scheduling) {
    return {
        id: scheduling.id,
        description: scheduling.description,
        client: {
            id: scheduling.client_id,
            name: scheduling.client_name,
            nickname: scheduling.client_nickname
        },
        start: scheduling.start,
        end: scheduling.end,
        price: scheduling.price,
    }
}

class SchedulingRepository {
    async createScheduling(scheduling) {
        await db.insert(scheduling).into('schedulings')
    }

    async updateScheduling(scheduling) {
        await db('schedulings')
            .where({ id: scheduling.id })
            .update(scheduling)
    }

    async deleteScheduling(id) {
        await db('schedulings')
            .where({ id })
            .del()
    }

    async getSchedulings({initialDate, finalDate}) {
        const filters = {}

        if (initialDate) {
            filters.start = initialDate
        }

        if (finalDate) {
            filters.end = finalDate
        }

        const result = await db.select([
                'schedulings.*',
                'clients.name as client_name',
                'clients.nickname as client_nickname'
            ])
            .from('schedulings')
            .leftJoin('clients', 'client_id', 'clients.id')
            .where((builder) => {
                builder.whereRaw('1=1')

                if (initialDate) {
                    builder.andWhere('end', '>=', initialDate)
                }

                if (finalDate) {
                    builder.andWhere('start', '<=', finalDate)
                }
            })
        return result.map(formatScheduling)
    }

    async getSchedulingById(id) {
        const schedulingResult = await db.select([
                'schedulings.*',
                'clients.name as client_name',
                'clients.nickname as client_nickname'
            ])
            .from('schedulings')
            .leftJoin('clients', 'client_id', 'clients.id')
            .where('schedulings.id', '=', id)
            .first()

        if (!schedulingResult) {
            throw new ResourceNotFoundError('Agendamento não encontrado')
        }

        return formatScheduling(schedulingResult)
    }
}

module.exports = SchedulingRepository