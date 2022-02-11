// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const MONGODB_URI = require("../utils/consts");

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
