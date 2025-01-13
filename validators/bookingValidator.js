import Joi from 'joi';

const bookingSchema = Joi.object({
  user: Joi.string().hex().length(24).required(), // ObjectId is a 24-character hexadecimal string
  itemType: Joi.string().valid('Property', 'Vehicle').required(),
  item: Joi.string().hex().length(24).required(), // ObjectId reference
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').default('PENDING'),
  appointmentDate: Joi.date().required(),
  preferredTime: Joi.string().required()
});

export const validateBooking = async (data) => {
  return bookingSchema.validateAsync(data);
};
