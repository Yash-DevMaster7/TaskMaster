// This JS file will contain all logic for database connection

const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const dbUrl = process.env.DATABASE_URL;

// Connecting to mongodb database
mongoose.connect(dbUrl);

// Defining User Schema
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

// Defining Todo Schema
const todoSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo,
};
