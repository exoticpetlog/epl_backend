const messages = {
  reg_missing: "please provide username, password1, password2, and email",
  reg_pw: "passwords do not match",
  reg_user: "that username is already in use",
  reg_email: "that email is already in use",
  login_missing: "please provide both username and password",
  login_invalid: "login credentials are invalid"
};

function send400Response(res, key) {
  // console.log(messages[key]);
  return res.status(400).json({ message: messages[key] });
}

module.exports = send400Response;
