import Joi from 'joi';

export const validateForm = async (data) => {
  const formValidationSchema = Joi.object({
    type: Joi.string()
      .valid('AcademicResearch', 'PlagiarismTest')
      .required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),
    file: Joi.when('type', {
      is: 'AcademicResearch',
      then: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!/\.(pdf|doc|docx)$/i.test(value)) {
            return helpers.message('File must be a valid PDF, DOC, or DOCX.');
          }
          return value;
        }),
      otherwise: Joi.forbidden() // Forbid the `file` field for `PlagiarismTest`
    })
  });

  return formValidationSchema.validateAsync(data, { abortEarly: false });
};
