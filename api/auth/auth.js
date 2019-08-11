const bcrypt = require("bcrypt.js");
const express = require("express");

const route = express.route();

route.get("/", (req, res, next) => {
  res.status(200).send("Hi from Auth...");
});
