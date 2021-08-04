const config = require("config");
const checkTodayLimit = require("./checkTodayLimit");

const checkRequestLimit = async (route, user) => {
  // global variables
  const userLimits = config.get("userLimits");
  // variables
  let routeRequested = route.requested;
  const routeTotalRequested = route.totalRequested;
  const userSubs = user.subscription;

  //   check if request in same day
  // if it is do nothing
  // else update into DB > history and reset the limits
  const checkedDateLimit = await checkTodayLimit(route, routeRequested);
  if (checkedDateLimit) routeRequested = 0;
  const getSubs = userSubs <= 1 ? "normal" : "premium";

  if (routeRequested >= userLimits[getSubs]) {
    route.overRequested += 1;
    route.totalOverRequested += 1;
    await route.save();
    return false;
  }

  //   update route requestes in DB
  route.requested += 1;

  // update totalRequested
  route.totalRequested += 1;

  await route.save();

  return true;
};

module.exports = checkRequestLimit;
