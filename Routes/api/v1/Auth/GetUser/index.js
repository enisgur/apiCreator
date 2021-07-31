const auth = require("../../../../../middleware/auth");
// Models
const Users = require("../../../../../Models/User");
// handlers
const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const { routesAuth } = require("../../../../../config/routes");
const { authErrors } = require("../../../../../config/errorCodes");

// @route   GET api/v1/auth
// @desc    Get User
// @access  Private
async function postLogin(router) {
  return router.get(routesAuth.allAuth.routeGetUser, auth, async (req, res) => {
    const { getUserMainCatch } = authErrors;
    try {
      const reqUserID = req.user.id;
      const user = await Users.findById(reqUserID).select("-password");
      //       res.json(user);
      success(res, user);
    } catch (err) {
      return serverError(res, getUserMainCatch, err.message);
    }
  });
}

module.exports = postLogin;
