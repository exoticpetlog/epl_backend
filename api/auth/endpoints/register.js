const bcrypt = require("bcryptjs");
const db = require("../../../config/dbConfig.js");
const send400Response = require("./responses/send400response.js");
const { getToken } = require("../tokens/tokenHelpers.js");

async function register(req, res, next) {
  try {
    // check for proper registration info
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password1 ||
      !req.body.password2
    ) {
      send400Response(res, "reg_missing");
      return;
    }
    // check passwords match
    if (req.body.password1 !== req.body.password2) {
      send400Response(res, "reg_pw");
      return;
    }

    // check username doesnt already exist
    const user = await db("users")
      .where({ username: req.body.username })
      .first();
    if (user) {
      send400Response(res, "reg_user");
      return;
    }

    // check email doesnt already exist
    const email = await db("users")
      .where({ email: req.body.email })
      .first();
    if (email) {
      send400Response(res, "reg_email");
      return;
    }

    // insert new user to database
    // TODO - utilize returning after switching to postgres, the response will default to a count instead of IDs (iirc)
    const ids = await db("users").insert({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password1, 8),
      email: req.body.email
    });

    // respond with token
    res.status(201).json({
      message: `Welcome, ${req.body.username}!`,
      token: getToken(ids[0])
    });
  } catch (err) {
    next(err);
  }
}

module.exports = register;
