const express = require("express");
const UserService = require("./user.service");
const userService = new UserService();
const errors = require("../configs/errorMessages");
const userValidation = require("./user.validation");
const { validate } = require("express-validation");
const errorCode = require("../configs/errorCodes.js");

class UserController {
  constructor() {
    this.path = "/user";
    this.router = express.Router();
    this.initializeRoutes();
  }

  async signup(req, res) {
    try {
      const result = await userService.signup(req.body);
      res.send(result);
    } catch (error) {
      if (error.message === errorCode.conflict.message) {
        res.status(errorCode.conflict.statusCode).send(errors.unauthorized);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  async login(req, res) {
    try {
      const result = await userService.login(req.body);
      res.send(result);
    } catch (error) {
      console.log(error);
      if (error.message === errorCode.unauthorized.message) {
        res.status(errorCode.unauthorized.statusCode).send(errors.unauthorized);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validate(userValidation.signup),
      this.signup
    );
    this.router.post(
      `${this.path}/login`,
      validate(userValidation.login),
      this.login
    );
  }
}
module.exports = UserController;
