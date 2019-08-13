const errorResponses = {
  missing: {
    status: 400,
    body: {
      message: "please provide username, passwords, and email"
    }
  },
  passwords: {
    status: 400,
    body: {
      message: "passwords do not match"
    }
  }
};

function sendErrorResponse(res, key) {
  return res
    .status(errorResponses[key]["status"])
    .json(errorResponses[key]["body"]);
}

module.exports = { sendErrorResponse, errorResponses };
