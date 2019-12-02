require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // for extracting body from requests
const { body, validationResult } = require("express-validator"); // for requests validations
const mongoose = require("mongoose"); // for dealing with the monogodb database
const path = require("path");
const User = require(path.join(__dirname, "models", "user"))(mongoose); // load user model
const Contact = require(path.join(__dirname, "models", "contact"))(mongoose); // load contact model
const contactsValidators = require(path.join(
  __dirname,
  "validators",
  "contactsValidators",
  "index"
))(body, path); // validators for contacts route
const contactsController = require(path.join(
  __dirname,
  "controllers",
  "contactsController",
  "index"
))(User, Contact, path); // a controller that handle contacts logic
const contactsRouter = require(path.join(
  __dirname,
  "routers",
  "contactsRouter"
))(express, contactsValidators, validationResult, contactsController); //contacts router
const usersValidators = require(path.join(
  __dirname,
  "validators",
  "usersValidators",
  "index"
))(body, path); // validators for users route
const usersController = require(path.join(
  __dirname,
  "controllers",
  "usersController",
  "index"
))(User, path); // a controller that handle users logic
const usersRouter = require(path.join(__dirname, "routers", "usersRouter"))(
  express,
  usersValidators,
  validationResult,
  usersController
);

//extract body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// for debugging
const db = mongoose.connection;
db.on("error", () => {
  console.log("some error has happened with the database");
});
db.once("open", () => {
  console.log("database is connected");
});

// set routers
app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);

// listen for requests on the specified port
app.listen(process.env.PORT, () =>
  console.log(`app is listening on port ${process.env.PORT}`)
);
