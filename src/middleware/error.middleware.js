const { ValidationError } = require("express-validation");

function errorHandlerMiddleware(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(400).send(error);
  } else {
    console.log(error);

    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
}
module.exports = errorHandlerMiddleware;
