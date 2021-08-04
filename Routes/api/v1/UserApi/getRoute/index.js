const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Apis = require("../../../../../Models/Apis");

const { routeUserApi } = require("../../../../../config/routes");
const { userApiErrors } = require("../../../../../config/errorCodes");

const checkRequiestLimit = require("../../Components/checkRequestLimit");
const auth = require("../../../../../middleware/auth");

// @route   GET api/v1/:user/:route
// @desc    Get route from param
// @access  Public
async function getUserRoute(router) {
  return router.get(routeUserApi.routeGetRoute, async (req, res) => {
    //   errors
    const {
      routeGetMainCatch,
      routeParamRouteNotFound,
      routeParamUserNotFound,
      routeRouteNotFound,
      routeUsernameNotMatch,
      routeLimitReached,
      routeUserDeleted,
      routeUserNotExist,
    } = userApiErrors;

    //     get param route
    const paramUser = req.params.user;
    const paramRoute = req.params.route;
    if (!paramRoute) return serverError(res, routeParamRouteNotFound);
    if (!paramUser) return serverError(res, routeParamUserNotFound);

    try {
      let route = await Apis.findOne({ route: paramRoute });
      const user = await Users.findOne({ _id: route.user });
      // check if user find
      if (!user) return serverError(res, routeUserNotExist);
      // check if user isDeleted or banned??
      if (user.isDeleted) return serverError(res, routeUserDeleted);
      //       check if route find?
      if (!route) return serverError(res, routeRouteNotFound);
      //       check if username is same as param
      if (paramUser !== route.userInfo.username)
        return serverError(res, routeUsernameNotMatch);

      // TODO _______________________________________________________________
      //  Check requested limit if limit reached send serverError
      //       ______________________________________________________________
      const limitChecked = await checkRequiestLimit(route, user);
      if (!limitChecked) return serverError(res, routeLimitReached);

      // return success(res, route.data);
      return success(res, route);
    } catch (err) {
      return serverError(res, routeGetMainCatch, err.message);
    }
  });
}

module.exports = getUserRoute;
