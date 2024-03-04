const express = require("express");
const TrackService = require("./track.service");
const trackService = new TrackService();
const errors = require("../configs/errorMessages");
const trackValidation = require("./track.validation");
const { validate } = require("express-validation");
const errorCode = require("../configs/errorCodes.js");
const authenticationMiddleware = require('../middleware/auth.middleware');

class TrackController {
  constructor() {
    this.path = "/track";
    this.router = express.Router();
    this.initializeRoutes();
  }

  async addTrack(req, res) {
    try {
      const result = await trackService.addTrack(req.body);
      res.send(result);
    } catch (error) {
        console.log(error);
      if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.notFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async deleteTrack(req, res) {
    try {
      await trackService.deleteTrack(req.params.id);
      res.end();
    } catch (error) {
      if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.trackNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async getTracksByAlbumId(req, res) {
    try {
      const result = await trackService.getTracksByAlbumId(
        req.params.albumId,
        req.body.categoryId
      );
      res.send(result);
    } catch (error) {
      res.status(errorCode.internalServerError.statusCode).send(error);
    }
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, validate(trackValidation.addTrack), this.addTrack);
    this.router.delete(`${this.path}/:id`, validate(trackValidation.deleteTrack), this.deleteTrack);
    this.router.get(`${this.path}/:albumId`, authenticationMiddleware, validate(trackValidation.getTracksByAlbumId), this.getTracksByAlbumId);
  }
}
module.exports = TrackController;
