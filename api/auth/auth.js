const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/dbConfig.js");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const ids = await db("users").insert({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email
    });

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
    const user = await db("users")
      .where({ username: req.body.username })
      .first();
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          message: `Welcome Back, ${req.body.username}`,
          token: getToken(user.id)
        });
      } else {
        res.status(400).json({ message: "access denied" });
      }
    } else {
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
        message: "please provide an auth token in headers as 'authorization'"
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { authRouter, verifyToken };
