const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/dbConfig.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("Hi from Auth...");
});

router.post("/register", async (req, res, next) => {
  const ids = await db("users").insert({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email
  });

  res.status(201).json({
    message: `Welcome, ${req.body.username}!`,
    token: getToken(ids[0])
  });
});

router.post("/login", async (req, res, next) => {
  const user = await db("users")
    .where({ username: req.body.username })
    .first();
  if (bcrypt.compareSync(req.body.password, user.password)) {
    res
      .status(200)
      .json({
        message: `Welcome Back, ${req.body.username}`,
        token: getToken(user.id)
      });
  } else {
    res.status(400).json({ message: "access denied" });
  }
});

function getToken(userID) {
  return jwt.sign(
    {
      user_id: userID
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = router;
