const { Schema, model } = require("mongoose");

// Generates a random user number for default users with no handlename provided
const randomUserNumber = Math.random().toString().split("").splice(2, 7).join("")

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

  handlename: {
    type: String,
    required: true,
    unique: true
  }

},
  { timestamps: true, });

const User = model("User", userSchema);

module.exports = User;
