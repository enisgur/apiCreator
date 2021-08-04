const moment = require("moment");
const config = require("config");

const checkTodayLimit = async (route, routeRequested) => {
  const todayDate = moment().format("YYYY-MM-DD");
  const splitedTodayDate = todayDate.split("-");
  //   year - month - day
  // 	0	1	2

  const routeRequestDate = moment(route.requestDate).format("YYYY-MM-DD");
  const splitedRouteRequestDate = routeRequestDate.split("-");

  const resetRequests = async () => {
    //     reset Limits
    routeRequested = 0;
    route.requested = 0;
    route.overRequested = 0;
    route.requestDate = Date.now();
    //     route.requestDate = todayDate;
    return;
  };

  let newHistory = {
    date: routeRequestDate,
    month: splitedRouteRequestDate[1],
    year: splitedRouteRequestDate[0],
    day: splitedRouteRequestDate[2],
    requested: route.requested,
    overRequested: route.overRequested,
  };

  //   console.log(moment(route.requestDate).format("YYYY-MM-DD"), todayDate);
  //   check if route.requestDate and today date is same
  // if same do nothing
  // else record in DB history and reset limits
  if (moment(route.requestDate).format("YYYY-MM-DD") == todayDate) {
    console.log("Runss");
    return false;
  }

  //   check history is null?
  if (route.history.length < 1) {
    route.history.unshift([newHistory]);
    // reset requests
    await resetRequests();
    await route.save();
    return true;
  }

  //   check if history in same month and year ??
  const getLastMonthHistory = route.history[0].month;
  const getLastYearHistory = route.history[0].year;
  if (String(getLastMonthHistory) === String(splitedTodayDate[1])) {
    //   check year here (if it is in same year)

    route.history[0].unshift(newHistory);
    // reset requests
    await resetRequests();
    await route.save();
    return true;
  }

  route.history.unshift([newHistory]);
  // reset requests
  await resetRequests();
  await route.save();
  return true;
};

module.exports = checkTodayLimit;
