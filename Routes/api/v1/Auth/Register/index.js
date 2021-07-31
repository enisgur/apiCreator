const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const Users = require("../../../../../Models/User");

const { Auth } = require("../../../../../config/routes");
const { AuthErrors } = require("../../../../../config/errorCodes");

// @route   POST api/v1/auth/register
// @desc    Register User
// @access  Public
async function postLogin(router) {
  return router.post(Auth.allAuth.routePostRegister, async (req, res) => {
    const { username, password, email } = req.body;
    try {
      // See if user exists
      let user = await Users.findOne({ username });

      if (user) {
        return serverError(res, AuthErrors.registerUserExist, null);
      }

      user = new Users({
        username,
        password,
        email,
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
          return res.json({ token });
        }
      );
    } catch (err) {
      return serverError(res, AuthErrors.registerMainCatch, err.message);
    }
  });
}

module.exports = postLogin;
