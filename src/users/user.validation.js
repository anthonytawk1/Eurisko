const { Joi } = require("express-validation");

module.exports = {
  signup: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      dateOfBirth: Joi.date().iso().required(),
      location: Joi.object({
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
      }).required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
