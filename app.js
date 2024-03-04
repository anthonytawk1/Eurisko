const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./src/lib/database");
const config = require("./src/configs/config");
const CategoryController = require("./src/categories/category.controller");
const AlbumController = require("./src/albums/album.controller");
const errorHandlerMiddleware = require("./src/middleware/error.middleware");
const TrackController = require("./src/tracks/track.controller");
const UserController = require("./src/users/user.controller");
app.use(bodyParser.json());

async function startServer() {
  try {
    await database.connectToTheDatabase();

    await initializeControllers([
      new CategoryController(),
      new AlbumController(),
      new TrackController(),
      new UserController(),
    ]);

    await initializeErrorHandlerMiddlware();

    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

async function initializeControllers(controllers) {
  for (const controller of controllers) {
    app.use("/", controller.router);
  }
}

async function initializeErrorHandlerMiddlware() {
  app.use(errorHandlerMiddleware);
}

startServer();
