const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/dbConfig.js");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const authRouter = express.Router();
const { sendErrorResponse } = require("./errorResponses.js");

authRouter.post("/register", async (req, res, next) => {
  try {
    // check for proper registration info
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password1 ||
      !req.body.password2
    ) {
      sendErrorResponse(res, "missing");
      // res
      //   .status(400)
      //   .json({ message: "please provide username, passwords, and email" });
      return;
    }
    // check passwords match
    if (req.body.password1 !== req.body.password2) {
      sendErrorResponse(res, "password");
      return;
    }

    // insert new user to database
    const ids = await db("users").insert({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password1, 8),
      email: req.body.email
    });

    // respond with token
    res.status(201).json({
      message: `Welcome, ${req.body.username}!`,
      token: getToken(ids[0])
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    // check body for required login info
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .json({ message: "please provide both username and password" });
      return;
    }

    // retrieve user info from database
    const user = await db("users")
      .where({ username: req.body.username })
      .first();

    // respond accordingly if none found
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    // check password and respond with token
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        message: `Welcome Back, ${req.body.username}`,
        token: getToken(user.id)
      });
    } else {
      // pw did not match
      res.status(400).json({ message: "access denied" });
    }
  } catch (err) {
    next(err);
  }
});

function getToken(userID) {
  return jwt.sign(
    {
      user_id: userID
    },
    jwtKey
    // no expiration wanted ( for now atleast... )
    // { expiresIn: "1h" }
  );
}

const verifyToken = async (req, res, next) => {
  try {
    // require authorization header
    if (!req.headers.authorization) {
      res.status(400).json({
        message: "please provide your auth token in headers as 'authorization'"
      });
      return;
    }

    let decoded;
    // verify token
    try {
      decoded = jwt.verify(req.headers.authorization, jwtKey);
      console.log(decoded);
    } catch (error) {
      res.status(400).json({ error });
      return;
    }

    // get user from db
    const user = await db("users")
      .where({ id: decoded.user_id })
      .first();

    // respond appropriately if not found (should be found since required to get token in first place)
    if (!user) {
      res.status(404).json({ message: "user on token not found" });
      return;
    }

    // attach user to req object without password field
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authRouter, verifyToken };
