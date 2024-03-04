const { Joi } = require("express-validation");

module.exports = {
  addCategory: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      createdBy: Joi.string().hex().length(24).required(),
      updatedBy: Joi.string().hex().length(24).required(),
    }),
  },
};
