// Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// Logs Requests in the terminal
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// Needed to deal with cookies
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// Serves a custom favicon on each request
// https://www.npmjs.com/package/serve-favicon
const favicon = require("serve-favicon");

// global package used to `normalize` paths amongst different operating systems
// https://www.npmjs.com/package/path
const path = require("path");

// Session middleware for authentication
// https://www.npmjs.com/package/express-session
const session = require("express-session");

// MongoStore in order to save the user session in the database
// https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");

// Connects the mongo uri to maintain the same naming structure
const MONGO_URI = require("../utils/consts");


// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));

  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // AHandles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use(express.static(path.join(__dirname, '..', 'stylesheets')))


  // Handles access to the favicon
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );


  // Middleware that adds a "req.session" information and later to check that you are who you say you are 😅
  app.use(
    session({

      secret: process.env.SESSION_SECRET || "NO ONE KNOWS THE SECRET WHICH MAKES IT A SECRET",
      resave: true,
      saveUninitialized: false,

      cookie: {
        httpOnly: true,
        maxAge: 600000000
      },

      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 6000000000
      }),

    })
  );
};
