const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Users = require("../../../../../Models/User");
const Apis = require("../../../../../Models/Apis");

const { routeUserApi } = require("../../../../../config/routes");
const { userApiErrors } = require("../../../../../config/errorCodes");

const auth = require("../../../../../middleware/auth");

// @route   POST api/v1/:user/:route
// @desc    Post user route
// @access  Public
async function postUserRoute(router) {
  return router.post(routeUserApi.routePostRoute, async (req, res) => {
    //   errors
    const { routeExist, routeMainCatch, routeCantSaveApi } = userApiErrors;
    //     req body
    const { userID, name, type, route, isDatabase, data } = req.body;

    //     get param route
    const paramUser = req.params.user;
    const paramRoute = req.params.route;

    try {
      console.log(paramUser, paramRoute);
      res.json({ ok: "ok!" });
    } catch (err) {
      return serverError(res, routeMainCatch, err.message);
    }
  });
}

module.exports = postUserRoute;
