exports.authErrors = {
  // REGISTER
  registerMainCatch: {
    msg: "Register Failed !",
    code: "98889449444",
  },
  registerUserExist: {
    msg: "User Already Exist !",
    code: "77758585843",
  },
  //   LOGIN
  loginMainCatch: {
    msg: "Got some problem with login !",
    code: "113083129821",
  },
  loginUsername: {
    msg: "Invalid Credentials",
    code: "99938381298398423",
  },
  loginPassword: {
    msg: "Invalid Credentials",
    code: "99938381297398423", // onenumber is different inthe middle
  },
  loginDeleted: {
    msg: "Invalid Credentials",
    code: "99938381297398423", // onenumber is different inthe middle
  },
  //   GET USER
  getUserMainCatch: {
    msg: "User couldn't get",
    code: "11833888857",
  },
};

exports.userApiErrors = {
  // post Create Route
  routeMainCatch: {
    msg: "Route create failed !",
    code: "8298498129849812830",
  },
  routeExist: {
    msg: "Route is exist",
    code: "9192049399238",
  },
  routeCantSaveApi: {
    msg: "Couldn't saved the api",
    code: "9129943099292929",
  },
  // get route
  routeGetMainCatch: {
    msg: "Route get failed !",
    code: "1239124129549123",
  },
  routeParamRouteNotFound: {
    msg: "Param not found",
    code: "12381298312",
  },
  routeParamUserNotFound: {
    msg: "Param not found",
    code: "123812398312",
  },
  routeRouteNotFound: {
    msg: "There is no route",
    code: "91298040912549",
  },
  routeUsernameNotMatch: {
    msg: "User not match",
    code: "192381283803422",
  },
  routeLimitReached: {
    msg: "Request Limit Reached",
    code: "198128398198000",
  },
  // user
  routeUserNotExist: {
    msg: "User Couldn't find",
    code: "123123123123444",
  },
  routeUserDeleted: {
    msg: "User Couln't find",
    code: "1231551231231",
  },
};
