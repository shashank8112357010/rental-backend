import Joi from 'joi';

const propertySchema = Joi.object({
  type: Joi.string().valid('FLAT', 'PG').required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  locationLink: Joi.string().uri().required(),

  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  amenities: Joi.array().items(Joi.string()),
  available: Joi.boolean().default(true),

  // Conditional validation for PG properties
  pgCategory: Joi.string().valid('BOYS', 'GIRLS').when('type', {
    is: 'PG', // Only required if type is PG
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  // Conditional validation for occupancy (number of rooms for PG)
  occupancy: Joi.number().min(1).max(100).when('type', {
    is: 'PG', // Only required if type is PG
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  // Conditional validation for Flats
  flatType: Joi.string().valid('1BHK', '2BHK', '3BHK').when('type', {
    is: 'FLAT', // Only required if type is FLAT
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  // New: Conditional validation for furnishType
  furnishType: Joi.string().valid('SemiFurnished', 'Unfurnished', 'FullyFurnished').when('type', {
    is: 'FLAT', // Only required if type is FLAT
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  owner: Joi.string().required(),
});

export const validateProperty = async (data) => {
  return propertySchema.validateAsync(data);
};
