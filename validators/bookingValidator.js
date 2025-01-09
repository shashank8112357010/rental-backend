import Joi from 'joi';

const bookingSchema = Joi.object({
  type: Joi.string().valid('BIKE', 'SCOOTY').required(),
  model: Joi.string().required(),
  description: Joi.string().min(10).max(1000).required(),
  pricePerDay: Joi.number().min(0).required(),
  location: Joi.string().required(),
  image: Joi.string().uri().required(),
  available: Joi.boolean().default(true)
});

export const validateBooking = async (data) => {
  return bookingSchema.validateAsync(data);
};