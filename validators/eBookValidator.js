import Joi from 'joi';

const eBookValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),


  content: Joi.string()
    .required()
    .custom((value, helpers) => {
      // Validate file extension
      if (!/\.(pdf|doc|docx)$/i.test(value)) {
        return helpers.message('Content must be a valid file with .pdf, .doc, or .docx extension');
      }
      return value;
    })
});

export const validateEBook = async (data) => {
  try {
    const validatedData = await eBookValidationSchema.validateAsync(data, { abortEarly: false });
    return validatedData;
  } catch (error) {
    throw error; // Let the caller handle validation errors
  }
};
