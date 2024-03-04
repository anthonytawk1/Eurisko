const mongoose = require("mongoose");
const config = require("../configs/config");

const trackModel = new mongoose.Schema(
  {
    name: String,
    singer: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.modelNames.category,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.modelNames.album,
    },
  },
  { timestamps: true }
);
trackModel.index({ categoryId: 1 });
trackModel.index({ albumId: 1 });

module.exports = mongoose.model(config.modelNames.track, trackModel);
