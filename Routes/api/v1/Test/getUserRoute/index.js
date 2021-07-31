const { testRoute } = require("../../../../../config/routes");

const dbData = require("../../../../../testings/testUserDb.json");

// @route   GET api/v1/auth
// @desc    Get User
// @access  Private
async function getTest(router) {
  return router.get(testRoute.testing.routeGetUser, async (req, res) => {
    try {
      const userName = req.params.user;
      const userRoute = req.params.route;

      // check if there ara queries ??
      const qLimit = req.query.limit;
      const qSearch = req.query.search;
      console.log(qLimit, qSearch);

      // check db bellow
      // to see if user > route is exist

      // if exist get all data to return

      res.status(200).json({ msg: "ok", user: userName, route: userRoute });
      //       res.status(200).json({ ...dbData.apis[0].data, from: "get" });
    } catch (err) {
      res.status(500).json({ msg: "Server Error", err: err.message });
      // return serverError(res, "test get error / 11833888857");
    }
  });
}

module.exports = getTest;
