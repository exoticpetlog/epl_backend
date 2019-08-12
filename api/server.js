const express = require("express");
const cors = require("cors");
const { authRouter, verifyToken } = require("./auth/auth.js");
const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use(verifyToken);
server.get("/", (req, res) => {
  res.status(200).send(req.user);
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: "Something Failed", error: err });
});

module.exports = server;
