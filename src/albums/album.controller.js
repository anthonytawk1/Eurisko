const express = require("express");
const AlbumService = require("./album.service");
const albumService = new AlbumService();
const errors = require("../configs/errorMessages");
const albumValidation = require("./album.validation");
const { validate } = require("express-validation");
const errorCode = require("../configs/errorCodes.js");

class AlbumController {
  constructor() {
    this.path = "/album";
    this.router = express.Router();
    this.initializeRoutes();
  }

  async addAlbum(req, res) {
    try {
      const result = await albumService.addAlbum(req.body);
      res.send(result);
    } catch (error) {
      if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.userNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async updateAlbum(req, res) {
    try {
      const result = await albumService.updateAlbum(req.params.id, req.body);
      res.send(result);
    } catch (error) {
      if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.albumNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async deleteAlbum(req, res) {
    try {
      await albumService.deleteAlbum(req.params.id);
      res.end();
    } catch (error) {
      if (error.message === errorCode.conflict.message) {
        res
          .status(errorCode.conflict.statusCode)
          .send(errors.cannotDeleteAbumWithTracks);
      } else if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.albumNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async getAlbums(req, res) {
    try {
      const result = await albumService.getAlbums();
      res.send(result);
    } catch (error) {
      res.status(errorCode.internalServerError.statusCode).send(error);
    }
  }

  async getAlbumById(req, res) {
    try {
      const result = await albumService.getAlbumById(req.params.id);
      res.send(result);
    } catch (error) {
      if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.albumNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, validate(albumValidation.addAlbum), this.addAlbum);
    this.router.put(`${this.path}/:id`, validate(albumValidation.updateAlbum), this.updateAlbum);
    this.router.delete(`${this.path}/:id`, validate(albumValidation.deleteAlbum), this.deleteAlbum);
    this.router.get(`${this.path}`, this.getAlbums);
    this.router.get(`${this.path}/:id`, validate(albumValidation.deleteAlbum), this.getAlbumById);
  }
}
module.exports = AlbumController;
