import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().min(3).max(100).required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Phone number must be exactly 10 digits',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
    }),
});

const loginSchema = Joi.object({
  
    email: Joi.string().email(),
   
    password: Joi.string()
});

export const validateLoginUser = async (data) => {
    return loginSchema.validateAsync(data);
};

export const validateUser = async (data) => {
    return userSchema.validateAsync(data);
};