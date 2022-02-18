const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  // Search feature not implemented
  handlename: {
    type: String,
    required: true,
    unique: true
  },

  tests: {
    type: [Object],
  }

},
  { timestamps: true, });


const User = model("User", userSchema);

module.exports = User;
