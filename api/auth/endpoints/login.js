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
    const user = await db("users")
      .where({ username: req.body.username })
      .first();

    // respond accordingly if none found
    // if (!user) {
    //   res.status(404).json({ message: "user not found" });
    //   return;
    // }

    // check password and respond with token
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        message: `Welcome Back, ${req.body.username}`,
        token: getToken(user.id)
      });
    } else {
      // pw did not match or username DNE
      send400Response(res, "login_invalid");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = login;
