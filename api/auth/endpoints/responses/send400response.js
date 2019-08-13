const messages = {
  reg_missing: "please provide username, password1, password2, and email",
  reg_pw: "passwords do not match",
  reg_user: "that username is already taken",
  login_missing: "please provide both username and password",
  login_invalid: "username and password combination invalid"
};

function send400Response(res, key) {
  return res.status(400).json({ message: messages[key] });
}

module.exports = send400Response;
