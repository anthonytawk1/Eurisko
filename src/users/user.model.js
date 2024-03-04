const mongoose = require("mongoose");
const config = require("../configs/config");

const userModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    registrationDate: Date,
    dateOfBirth: Date,
    location: {
      type: {
        longitude: Number,
        latitude: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(config.modelNames.user, userModel);
