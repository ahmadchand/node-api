// const winston = require("winston");
// require("winston-mongodb");
// require("express-async-errors");

const { createLogger, format, transports } = require("winston");

module.exports = function () {
  const logFormat = format.printf(({ level, stack, message, timestamp }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.prettyPrint(),
          format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
          logFormat
        ),
        handleExceptions: true,
        handleRejections: true,
      }),
      new transports.File({
        filename: "./logs/errors.log",
        level: "error",
      }),
      // new transports.MongoDB({
      //   db: "mongodb://localhost/vidly",
      //   level: "error",
      //   options: { useUnifiedTopology: true },
      // }),
    ],

    exceptionHandlers: [
      new transports.File({ filename: "./logs/exceptions.log" }),
    ],

    rejectionHandlers: [
      new transports.File({ filename: "./logs/rejections.log" }),
    ],
  });
};
