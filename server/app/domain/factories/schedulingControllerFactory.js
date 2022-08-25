const SchedulingRepository = require("../repositories/scheduling.repository")
const SchedulingController = require("../../http/controllers/schedulings.controller")

const createSchedulingController = () => {
    const repository = new SchedulingRepository()
    return new SchedulingController(repository)
}

module.exports = createSchedulingController