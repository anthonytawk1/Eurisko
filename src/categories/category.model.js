const mongoose = require('mongoose');
const config = require('../configs/config');

const categoryModel = new mongoose.Schema(
  {
    name: String,
    description: String,
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

module.exports = mongoose.model(config.modelNames.category, categoryModel);
