import Joi from 'joi';


const helpValidationSchema = Joi.object({
    bookingId: Joi.string().required(),
    
    message: Joi.string().required(),
});

export const validateHelp = async (data) => {
    return helpValidationSchema.validateAsync(data);
};
