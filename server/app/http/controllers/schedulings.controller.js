function formatScheduling(scheduling) {
    const formattedScheduling = {
        description: scheduling.description,
        client_id: scheduling.client_id,
        start: scheduling.start.replace('Z', ' '),
        end: scheduling.end.replace('Z', ' '),
        price: scheduling.price
    }

    if (scheduling.id) {
        formattedScheduling['id'] = scheduling.id
    }

    return formattedScheduling
}

class SchedulingController {
    constructor(schedulingRepository) {
        this.schedulingRepository = schedulingRepository
    }

    async createScheduling(scheduling) {
        const formattedScheduling = formatScheduling(scheduling)
        await this.schedulingRepository.createScheduling(formattedScheduling)
    }

    async updateScheduling(scheduling) {
        const formattedScheduling = formatScheduling(scheduling)
        await this.schedulingRepository.updateScheduling(formattedScheduling)
    }

    async deleteScheduling(id) {
        await this.schedulingRepository.deleteScheduling(id)
    }

    getSchedulings({initialDate, finalDate}) {
        return this.schedulingRepository.getSchedulings({initialDate, finalDate})
    }

    async getSchedulingById(id) {
        return this.schedulingRepository.getSchedulingById(id)
    }
}

module.exports = SchedulingController