const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  addAlbum: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      showNbOfTracks: Joi.boolean().required(),
      createdBy: Joi.objectId().required(),
      updatedBy: Joi.objectId().required(),
    }),
  },
  updateAlbum: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      showNbOfTracks: Joi.boolean().required(),
      createdBy: Joi.objectId().required(),
      updatedBy: Joi.objectId().required(),
    }),
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  },
  deleteAlbum: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  },
};
