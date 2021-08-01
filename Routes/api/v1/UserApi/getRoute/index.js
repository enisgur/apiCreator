const config = require("config");

const serverError = require("../../Components/errorHandler/serverError");
const success = require("../../Components/returnHandler/successReturn");

const Apis = require("../../../../../Models/Apis");

const { routeUserApi } = require("../../../../../config/routes");
const { userApiErrors } = require("../../../../../config/errorCodes");

const auth = require("../../../../../middleware/auth");

// @route   GET api/v1/userapi/getroute/:route
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
    } = userApiErrors;

    //     get param route
    const paramUser = req.params.user;
    const paramRoute = req.params.route;
    if (!paramRoute) return serverError(res, routeParamRouteNotFound);
    if (!paramUser) return serverError(res, routeParamUserNotFound);

    try {
      let route = await Apis.findOne({ route: paramRoute });
      //       check if route find?
      if (!route) return serverError(res, routeRouteNotFound);
      //       check if username is same as param
      if (paramUser !== route.userInfo.username)
        return serverError(res, routeUsernameNotMatch);

      // TODO _______________________________________________________________
      //  Check requested limit if limit reached send serverError
      //       ______________________________________________________________
      const userLimits = config.get("userLimits");
      //       normal user
      if (route.requested >= userLimits.normal)
        return serverError(res, routeLimitReached);
      //       premiumUser
      //       userLimits.premium

      // update requested
      route.requested += 1;

      //       update totalRequested
      route.totalRequested += 1;

      //       save all update on route
      await route.save();

      return success(res, route.data);
      //       return success(res, route);
    } catch (err) {
      return serverError(res, routeGetMainCatch, err.message);
    }
  });
}

module.exports = getUserRoute;
