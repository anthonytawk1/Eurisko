const userModel = require("./user.model");
const errorCodes = require("../configs/errorCodes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

class UserService {
  async getUserById(_id) {
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error(errorCodes.notFound.message);
    }
    return user;
  }

  async signup(user) {
    const { name, email, password, dateOfBirth, location } = user;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error(errorCodes.conflict.message);
    }
    const hashedPass = await bcrypt.hash(password, 12);
    return await new userModel({
      name: name,
      email: email,
      password: hashedPass,
      dateOfBirth: dateOfBirth,
      location: location,
      registrationDate: new Date(),
    }).save();
  }

  async login(user) {
    const { email, password } = user;
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      throw new Error(errorCodes.unauthorized.message);
    }
    const isEqual = await bcrypt.compare(password, userFound.password);
    if (!isEqual) {
      throw new Error(errorCodes.unauthorized.message);
    }
    const token = jwt.sign(
      {
        email: userFound.email,
        userId: userFound._id.toString(),
      },
      config.jwt.accessToken,
      { expiresIn: "1h" }
    );
    return {
      token,
      userId: userFound._id.toString(),
    };
  }
}
module.exports = UserService;
