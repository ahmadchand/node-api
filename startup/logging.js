// const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const { createLogger, format, transports, add } = require("winston");

module.exports = function () {
  // winston.exceptions.handle(
  //   new winston.transports.File({ filename: "uncaughtExceptions.log" })
  // );

  // winston.rejections.handle(
  //   new winston.transports.File({ filename: "unhandledRejections.log" })
  // );

  // process.on("unhandledRejection", (ex) => {
  //   throw ex;
  // });

  // winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // add(
  //   new transports.MongoDB({
  //     db: "mongodb://localhost/vidly",
  //     level: "error",
  //   })
  // );

  const logFormat = format.printf(({ level, stack, message, timestamp }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    // format: format.combine(format.json()),

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
      new transports.MongoDB({
        db: "mongodb://localhost/vidly",
        level: "error",
        options: { useUnifiedTopology: true },
      }),
    ],

    exceptionHandlers: [
      new transports.File({ filename: "./logs/exceptions.log" }),
    ],

    rejectionHandlers: [
      new transports.File({ filename: "./logs/rejections.log" }),
    ],
  });
};
