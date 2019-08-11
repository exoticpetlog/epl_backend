const express = require("express");
const cors = require("cors");

const authRoute = require("./auth/auth.js");
const server = express();
server.use(cors());

server.use("/auth", authRoute);

server.get("/", (req, res) => {
  res.status(200).send("What is it you desire?");
});

module.exports = server;
