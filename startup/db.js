const mongoose = require("mongoose");
const logger = require("./logging")();

module.exports = function () {
  const MONGO_URI = "mongodb://localhost/vidly";
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => logger.info("Connected to VidlyDB..."));
};
