const { testRoute } = require("../../../../../config/routes");

const dbData = require("../../../../../testings/testUserDb.json");



// @route   GET api/v1/auth
// @desc    Get User
// @access  Private
async function postTest(router) {
  return router.post(testRoute.testing.routeGetTest, async (req, res) => {
    try {
      
      
      
      
      
      res.status(200).json({...dbData.apis[0].data, from:"post"});
    } catch (err) {
      //   console.error(err.message);
        res.status(500).send("Server Error");
      // return serverError(res, "test get error / 11833888857");
    }
  });
}

module.exports = postTest;
