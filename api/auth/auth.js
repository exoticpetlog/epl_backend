const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/dbConfig.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("Hi from Auth...");
});

router.post("/register", async (req, res, next) => {
  const something = await db("users").insert({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email
  });
  res.status(201).json(something);
});

router.post("/login", async (req, res, next) => {
  const user = await db("users")
    .where({ username: req.body.username })
    .first();
  if (bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({ message: "access granted" });
  } else {
    res.status(400).json({ message: "access denied" });
  }
});

module.exports = router;
