const express = require("express");
const CategoryService = require("./category.service");
const categoryService = new CategoryService();
const errors = require("../configs/errorMessages");
const categoryValidation = require("./category.validation");
const { validate } = require('express-validation');
const errorCode = require('../configs/errorCodes.js');

class CategoryController {
  constructor() {
    this.path = "/category";
    this.router = express.Router();
    this.initializeRoutes();
  }

  async addCategory(req, res) {
    try {
      const result = await categoryService.addCategory(req.body);
      res.send(result);
    } catch (error) {
      if (error.message === errorCode.conflict.message) {
        res.status(errorCode.conflict.statusCode).send(errors.categoryAlreadyExists);
      } else if (error.message === errorCode.notFound.message) {
        res.status(errorCode.notFound.statusCode).send(errors.userNotFound);
      } else {
        res.status(errorCode.internalServerError.statusCode).send(error);
      }
    }
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validate(categoryValidation.addCategory),
      this.addCategory
    );
  }
}
module.exports = CategoryController;
