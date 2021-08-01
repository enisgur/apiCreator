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

// @route   POST api/v1/createroute
// @desc    Post new api
// @access  Private
async function postCreateApiRoute(router) {
  return router.post(
    routeUserApi.routePostCreateRoute,
    auth,
    async (req, res) => {
      //   errors
      const { routeExist, routeMainCatch, routeCantSaveApi } = userApiErrors;
      //     req body
      const { userID, name, type, route, isDatabase, data } = req.body;
      try {
        // Get current user
        let getUser = await Users.findOne({ _id: userID });

        // check if route is exist ?
        let isRoute = await Apis.findOne({ route });

        if (isRoute) {
          return serverError(res, routeExist);
        }

        //        create new Apis
        let newApi = new Apis({
          user: userID,
          userInfo: {
            username: getUser.username,
            email: getUser.email,
            name: getUser.name,
          },
          name,
          type,
          route,
          isDatabase,
          data,
        });

        const savedApi = await newApi.save();

        // check if api saved ?
        if (!savedApi) return serverError(res, routeCantSaveApi);

        //  update User db > apis push > created api's object ID

        await getUser.apis.push(savedApi);
        await getUser.save();

        //       return success with info
        return success(res, { ok: "Success" });

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
    }
  );
}

module.exports = postCreateApiRoute;
