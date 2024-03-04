const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  addTrack: {
    body: Joi.object({
      name: Joi.string().required(),
      singer: Joi.string().required(),
      categoryId: Joi.objectId().required(),
      albumId: Joi.objectId().required(),
    }),
  },
  deleteTrack: {
    params: Joi.object({
        id: Joi.objectId().required(),
    })
  },
  getTracksByAlbumId: {
    params: Joi.object({
        albumId: Joi.objectId().required(),
    }),
    body: Joi.object({
        categoryId: Joi.objectId().optional(),
    }),
  }
};
