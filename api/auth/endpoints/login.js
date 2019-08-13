const bcrypt = require("bcryptjs");
const db = require("../../../config/dbConfig.js");
const send400Response = require("./responses/send400response.js");
const { getToken } = require("../tokens/tokenHelpers.js");

async function login(req, res, next) {
  try {
    // check body for required login info
    if (!req.body.username || !req.body.password) {
      send400Response(res, "login_missing");
      return;
    }

    // retrieve user info from database
    let user = await db("users")
      .where({ username: req.body.username })
      .first();

    // if not found by username, try email
    if (!user) {
      user = await db("users")
        .where({ email: req.body.username })
        .first();
    }

    // check password and respond with token
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        message: `Welcome Back, ${req.body.username}`,
        token: getToken(user.id)
      });
    } else {
      // pw did not match or username/email DNE
      send400Response(res, "login_invalid");
      return;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = login;
