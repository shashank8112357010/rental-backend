import Joi from 'joi';


const enquiryValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits',
    }),
    serviceId: Joi.string().required(),
    itemType: Joi.string().valid('Property', 'Vehicle').required(),
    status: Joi.string().valid('OPEN', 'CLOSED'),
  });
  
  export const validateEnquiry = async (data) => {
    return enquiryValidationSchema.validateAsync(data);
  };
  
