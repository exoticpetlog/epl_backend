const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const db = require("../../../config/dbConfig.js");

function getToken(userID) {
  return jwt.sign(
    {
      user_id: userID
    },
    jwtKey
    // no expiration wanted ( for now atleast... )
    // { expiresIn: "1h" }
  );
}

const verifyToken = async (req, res, next) => {
  try {
    // require authorization header
    if (!req.headers.authorization) {
      res.status(400).json({
        message: "please provide your auth token in headers as 'authorization'"
      });
      return;
    }

    let decoded;
    // verify token
    try {
      decoded = jwt.verify(req.headers.authorization, jwtKey);
    } catch (error) {
      res
        .status(400)
        .json({ error, message: "token invalid. login for new token" });
      return;
    }

    // get user from db
    const user = await db("users")
      .where({ id: decoded.user_id })
      .first();

    // respond appropriately if not found (should be found since required to get token in first place)
    if (!user) {
      res.status(404).json({ message: "user on token not found" });
      return;
    }

    // attach user to req object without password field
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken, getToken };
