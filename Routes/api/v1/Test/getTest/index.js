const { testRoute } = require("../../../../../config/routes");

const dbData = require("../../../../../testings/testUserDb.json");



// @route   GET api/v1/auth
// @desc    Get User
// @access  Private
async function getTest(router) {

  // Check user routes here and 
  // match from parameter to create route to show
  // or redirect ???


  return router.get(testRoute.testing.routePostTest, async (req, res) => {
    try {
      
      
      
      
      
      res.status(200).json({...dbData.apis[0].data, from:"get"});
    } catch (err) {
      //   console.error(err.message);
        res.status(500).send("Server Error");
      // return serverError(res, "test get error / 11833888857");
    }
  });
}

module.exports = getTest;
