const jwt = require("jsonwebtoken");
const errorCodes = require("../configs/errorCodes");
const config = require("../configs/config");

//Verfying the access token
function authenticationMiddleware(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error(errorCodes.unauthorized.message);
    error.statusCode = errorCodes.unauthorized.statusCode; 
    throw error;
  }
  // Getting the token from the headers
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.jwt.accessToken);

  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    throw new Error(errorCodes.unauthorized.message);
  }
  req.userId = decodedToken.userId;
  next(); 
}

module.exports = authenticationMiddleware;
