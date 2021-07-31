const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Users = require("../../../../../Models/User");
const Apis = require("../../../../../Models/Apis");

const { routeUserApi } = require("../../../../../config/routes");
const { userApiErrors } = require("../../../../../config/errorCodes");

// @route   POST api/v1/auth/register
// @desc    Register User
// @access  Public
async function postLogin(router) {
  return router.post(routeUserApi.routePostCreateRoute, async (req, res) => {
    //   errors
    const { routeExist, routeMainCatch } = userApiErrors;
    //     req body
    const { userID, username, name, type, route, isDatabase, Data } = req.body;
    try {
      // check if route is exist ?
      let isRoute = await Apis.findOne({ route });
      if (isRoute) {
        return serverError(res, routeExist);
      }

      //        create new Apis

      //  update User db > apis push > created api's object ID

      //       return success with info

      //       user = new Users({
      //         username,
      //         password,
      //         email,
      //         name,
      //       });

      //       await user.save();
    } catch (err) {
      return serverError(res, routeMainCatch, err.message);
    }
  });
}

module.exports = postLogin;
