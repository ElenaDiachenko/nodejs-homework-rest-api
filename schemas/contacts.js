const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(5).required().email(),
  phone: Joi.string().required(),
});

module.exports = contactSchema;
