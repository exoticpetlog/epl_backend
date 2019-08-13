const express = require("express");
const cors = require("cors");
const authRouter = require("./auth/auth.js");
const { verifyToken } = require("./auth/tokens/tokenHelpers.js");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use(verifyToken);

// for tesing...
server.get("/", (req, res) => {
  res.status(200).send({ user: req.user, message: "I am listening..." });
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: "Something Failed", error: err });
});

module.exports = server;
