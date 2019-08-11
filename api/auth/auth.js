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
  console.log(something);
  res.status(201).json(something);
});

module.exports = router;
