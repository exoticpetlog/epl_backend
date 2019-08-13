const express = require("express");
const authRouter = express.Router();

const register = require("./endpoints/register.js");
const login = require("./endpoints/login.js");

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
