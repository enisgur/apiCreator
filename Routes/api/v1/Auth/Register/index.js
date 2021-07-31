const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const Users = require("../../../../../Models/User");

const { testRoute } = require("../../../../../config/routes");

// @route   POST api/v1/auth/register
// @desc    Register User
// @access  Public
async function postLogin(router) {
  return router.post(routesAdmin.auth.postRegister, async (req, res) => {
    const { username, location, password, email } = req.body;
    try {
      // See if user exists
      let user = await Users.findOne({ username });

      if (user) {
        // if user isDeleted that update to re-activate again
        if (user.isDeleted) {
          // Encrypt password
          const salt = await bcrypt.genSalt(10);
          const saltedPassword = await bcrypt.hash(password, salt);

          let updateUser = {
            isDeleted: false,
            location: location,
            password: saltedPassword,
            email: email,
            //   avatar,
          };

          await Users.findByIdAndUpdate(user._id, { $set: updateUser });
          return res.status(200).json({ msg: "Success, user deactivated" });
        }

        return serverError(res, "User already exists");
      }

      // Get users gravatar
      // const avatar = gravatar.url(location, {
      //   s: "200",
      //   r: "pg",
      //   d: "mm",
      // });

      user = new Users({
        username,
        location,
        password,
        email,
        //   avatar,
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
      // console.error(err.message);
      // res.status(500).send("Server error");
      return serverError(res, "Register Failed ! / 98889449444", err.message);
    }
  });
}

module.exports = postLogin;
