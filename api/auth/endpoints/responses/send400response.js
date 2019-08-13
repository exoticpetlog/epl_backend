const messages = {
  reg_missing: "please provide username, passwords, and email",
  reg_pw: "passwords do not match",
  login_missing: "please provide both username and password",
  login_invalid: "username and password combination invalid"
};

function send400Response(res, key) {
  return res.status(400).json({ message: messages[key] });
}

module.exports = send400Response;
