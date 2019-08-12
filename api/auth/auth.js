const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/dbConfig.js");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    // check for proper registration info
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password1 ||
      !req.body.password2
    ) {
      res
        .status(400)
        .json({ message: "please provide username, passwords, and email" });
      return;
    }
    // check passwords match
    if (req.body.password1 !== req.body.password2) {
      res.status(400).json({ message: "passwords do not match" });
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

    if (user) {
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
    } else {
      // no user by that name in database
      res.status(404).json({ message: "user not found" });
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
    jwtKey,
    { expiresIn: "1h" }
  );
}

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.verify(req.headers.authorization, jwtKey);
      const user = await db("users")
        .where({ id: decoded.user_id })
        .first();
      if (user) {
        delete user.password;
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } else {
      res.status(400).json({
        message: "please provide your auth token in headers as 'authorization'"
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { authRouter, verifyToken };
