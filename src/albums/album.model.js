const mongoose = require('mongoose');
const config = require('../configs/config');

const albumModel = new mongoose.Schema(
  {
    name: String,
    description: String,
    showNbOfTracks: {
      type: Boolean,
      default: false,
    },
    lastSongAddedAt: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.modelNames.user,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.modelNames.user,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(config.modelNames.album, albumModel);
