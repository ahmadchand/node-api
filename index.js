const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const genres = require("./routes/genres");
const express = require("express");
const debug = require("debug")("app:startup");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/", home);
app.use("/movies/genres", genres);

// Configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// app.use(logger);

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hey Ninjas" });
});

const port = process.env.PORT || 3000;
app.listen(
  port
  //  console.log(`Listening at port ${port}`)
);
