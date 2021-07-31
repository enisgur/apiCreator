const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Users = require("../../../../../Models/User");

const { routesAuth } = require("../../../../../config/routes");
const { authErrors } = require("../../../../../config/errorCodes");

// @route   POST api/v1/auth/login
// @desc    Authenticate user & get token LOGIN
// @access  Public
async function postLogin(router) {
  return router.post(routesAuth.allAuth.routePostLogin, async (req, res) => {
    const { loginMainCatch, loginUsername, loginPassword, loginDeleted } =
      authErrors;
    const { username, password } = req.body;

    try {
      // See if user exists
      let user = await Users.findOne({ username });

      if (!user) {
        return serverError(res, loginUsername);
      }

      if (user.isDeleted) {
        return serverError(res, loginDeleted);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return serverError(res, loginPassword);
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretJwt"),
        { expiresIn: config.get("secretExp") },
        (err, token) => {
          if (err) throw err;
          //   return res.json({ token });
          return success(res, { token });
        }
      );
    } catch (err) {
      return serverError(res, loginMainCatch);
    }
  });
}

module.exports = postLogin;
