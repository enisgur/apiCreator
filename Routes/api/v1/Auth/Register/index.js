const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Users = require("../../../../../Models/User");

const { routesAuth } = require("../../../../../config/routes");
const { authErrors } = require("../../../../../config/errorCodes");

// @route   POST api/v1/auth/register
// @desc    Register User
// @access  Public
async function postLogin(router) {
  return router.post(routesAuth.allAuth.routePostRegister, async (req, res) => {
    const { username, password, email, name } = req.body;
    try {
      // See if user exists
      let user = await Users.findOne({ username });

      if (user) {
        return serverError(res, authErrors.registerUserExist, null);
      }

      user = new Users({
        username,
        password,
        email,
        name,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          // return res.json({ token });
          return success(res, { token });
        }
      );
    } catch (err) {
      return serverError(res, authErrors.registerMainCatch, err.message);
    }
  });
}

module.exports = postLogin;
