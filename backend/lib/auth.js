const jwt = require("jsonwebtoken");
function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      });
    } else {
      // add user id to request
      req.body.userId = decoded.userId;
      next();
    }
  });
}

function getUsrInfo(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function(
    err,
    decoded
  ) {
    if (decoded !== null && decoded !== undefined) {
      req.body.userId = decoded.userId;
    } else {
      req.body.userId = null;
    }
    next();
  });
}

module.exports = validateUser;
