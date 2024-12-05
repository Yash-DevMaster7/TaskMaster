const express = require("express");
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(10);
const {
  validateSignup,
  validateLogin,
  validateUpdateDetails,
  validateUpdatePassword,
} = require("../zod/validateUser");

const { authMiddleware } = require("../middlewares/authmiddleware");
const { User } = require("../db/db");

const UserRouter = express.Router();

require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

// Route for creating user's account
UserRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const response = validateSignup(body);
  const ifExists = await User.findOne({
    email: body.email,
  });
  if (!response) {
    return res.json({
      message: "Sign up details not validated",
    });
  }
  if (ifExists) {
    return res.json({
      message: "User already exists",
    });
  }
  try {
    const hash = bcryptjs.hashSync(body.password, salt);
    const userCreated = await User.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: userCreated._id,
      },
      jwtsecret
    );
    return res.json({
      token,
    });
  } catch (e) {
    return res.json({
      message: "Error while creating user",
    });
  }
});

// Route with which user can log in
UserRouter.post("/login", async (req, res) => {
  const body = req.body;
  const response = validateLogin(body);
  const ifExists = await User.findOne({
    email: body.email,
  });
  if (!response) {
    return res.json({
      message: "Log in details not validated",
    });
  }
  if (!ifExists) {
    return res.json({
      message: "User don't exists",
    });
  }
  const isValidPassword = bcryptjs.compareSync(
    body.password,
    ifExists.password
  );
  if (!isValidPassword) {
    return res.json({
      message: "Invalid password",
    });
  }
  try {
    const id = ifExists._id;
    const token = jwt.sign(
      {
        id,
      },
      jwtsecret
    );
    return res.json({
      token,
    });
  } catch (e) {
    return res.json({
      message: "Error while creating user",
    });
  }
});

// Route for fetching user's details
UserRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.id, //from authMiddleware
    });
    return res.json({
      user,
    });
  } catch (error) {
    return res.json({
      message: "Error while fetching user details",
    });
  }
});

// Route for updating user's details
UserRouter.put("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const response = validateUpdateDetails(body);
  if (!response) {
    return res.json({
      message: "Update user details not validated",
    });
  }
  try {
    await User.updateOne(
      {
        _id: req.id, //from authMiddleware
      },
      body
    );
    return res.json({
      message: "User details updated successfully",
    });
  } catch (error) {
    return res.json({
      message: "Error while updating user details",
    });
  }
});

// Route for updating user's password
UserRouter.put("/update/pswd", authMiddleware, async (req, res) => {
  const id = req.id;
  const response = validateUpdatePassword(req.body);
  if (!response) {
    return res.json({
      message: "Update password not validated",
    });
  }
  const newPassword = req.body.password;
  const hash = bcryptjs.hashSync(newPassword, salt);
  const ifExists = await User.findById({
    _id: id, // from authMiddleware
  });
  if (!ifExists) {
    return res.json({
      message: "User not found",
    });
  }
  try {
    await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        password: hash,
      }
    );
    return res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
});

module.exports = UserRouter;
