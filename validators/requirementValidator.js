import Joi from 'joi';


const requirementValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits',
    }),
    requirement: Joi.string().required(),
    status: Joi.string().default('OPEN'),
  });
  
  export const validateRequirement = async (data) => {
    return requirementValidationSchema.validateAsync(data);
  };
  
