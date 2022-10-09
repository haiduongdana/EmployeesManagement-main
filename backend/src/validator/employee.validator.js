const Joi = require("joi");

const EmployeeSchema = Joi.object({
  first_name: Joi.string().trim(),
  last_name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  number: Joi.string().trim(),
  gender: Joi.required(),
  photo: Joi.string(),
});

const EmployeeUpdateSchema = Joi.object({
  first_name: Joi.string().trim(),
  last_name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  number: Joi.string().trim(),
  gender: Joi.required(),
});

module.exports = {
  EmployeeSchema,
  EmployeeUpdateSchema,
};
