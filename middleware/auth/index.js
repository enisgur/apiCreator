const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ error: "Server Error !", msg: "Token not found !" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("secretJwt"));

    // if (!decoded.user.isAdmin)
    //   return res
    //     .status(401)
    //     .json({ error: "Server Error !", msg: "Token is not valid !" });

    req.user = decoded.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Server Error !", msg: "Token is not valid !" });
  }
};
