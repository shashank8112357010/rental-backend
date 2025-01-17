import Joi from 'joi';

export const validatePurchase = async (data) => {
  const purchaseValidationSchema = Joi.object({
    user: Joi.string().hex().length(24).required(), // Valid ObjectId for user
    eBook: Joi.string().hex().length(24).required(), // Valid ObjectId for eBook
    price: Joi.number().positive().required(),
    transactionId: Joi.string()
  });

  return purchaseValidationSchema.validateAsync(data, { abortEarly: false });
};
