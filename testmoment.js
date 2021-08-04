const moment = require("moment");
const config = require("config");

const checkTodayLimit = async (route) => {
  const todayDate = moment().format("YYYY-MM-DD");

  //   year - month - day
  // 	0	1	2
  return todayDate.split("-")[0];

  let newHistory = {
    date: todayDate,
    month: todayDate.format("MM"),
    year: todayDate.format("YYYY"),
    day: todayDate.format("DD"),
    requested: route.requested,
    overRequested: route.overRequested,
  };
};

console.log(checkTodayLimit());
