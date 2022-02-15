// Gets access to environment variables/settings
require("dotenv/config");

// Connects to the database
require("./db");

// Handles http requests
const express = require("express");

// Handles the handlebars
const hbs = require("hbs");

const app = express();

// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Title of Website/Project
const projectName = "chill";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const trivia = require("./routes/trivia");
app.use("/trivia", trivia);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
