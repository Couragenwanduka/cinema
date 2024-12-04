import Joi from 'joi';

const theaterSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    capacity: Joi.number().integer().min(1).required(), // Theater seating capacity in number of seats
    createdAt: Joi.date().optional(), // Optional, Prisma will handle default
    updatedAt: Joi.date().optional(), // Optional, Prisma will handle default
  });

export default theaterSchema;