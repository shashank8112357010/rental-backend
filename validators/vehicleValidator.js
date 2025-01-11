import Joi from 'joi';

const vehicleSchema = Joi.object({
  type: Joi.string()
    .valid('BIKE', 'SCOOTY')
    .required()
    .messages({
      'any.required': 'Vehicle type is required.',
      'any.only': 'Vehicle type must be either BIKE or SCOOTY.'
    }),
  model: Joi.string()
    .required()
    .messages({
      'any.required': 'Vehicle model is required.'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'any.required': 'Description is required.',
      'string.min': 'Description must be at least 10 characters long.',
      'string.max': 'Description must not exceed 1000 characters.'
    }),
  pricePerDay: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Price per day is required.',
      'number.min': 'Price per day cannot be negative.'
    }),
    pricePerMonth: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Price per month is required.',
      'number.min': 'Price per month cannot be negative.'
    }),
  images: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required()
    .messages({
      'array.base': 'Images must be an array of valid URIs.',
      'array.min': 'At least one image is required.'
    }),
  available: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Available must be a boolean value.'
    }),
  stock: Joi.string()
    .required()
    .messages({
      'any.required': 'Stock is required.'
    }),
  owner: Joi.string()
    .required()
    .messages({
      'any.required': 'Owner name is required.'
    }),
  availabilityTime: Joi.array()
    .items(Joi.string().valid('hourly', 'weekly', 'monthly'))
    .min(1)
    .required()
    .messages({
      'array.base': 'Availability time must be an array.',
      'array.min': 'At least one availability time is required.',
      'any.only': 'Availability time must be one of hourly, weekly, or monthly.'
    })
});

export const validateVehicle = async (data) => {
  try {
    return await vehicleSchema.validateAsync(data, { abortEarly: false }); // Collect all errors
  } catch (err) {
    throw err;
  }
};
