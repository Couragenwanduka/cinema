import Joi from 'joi'

const scheduleSchema = Joi.object({
    movieId: Joi.number().integer().required(),
    theater: Joi.string().required(),
    startTime: Joi.date().iso().required(),
})

export default scheduleSchema;