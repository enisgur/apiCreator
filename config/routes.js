exports.testRoute = {
  testing: {
    main: "/api/v1/test", // URL
    mainPath: "./Routes/api/v1/Test", // Where the files are located
    routeGetTest: "/", // Get route for Test
    routePostTest: "/", // Get route for Test
    routeGetUser: "/:user/:route",
  },
};

exports.routesAuth = {
  allAuth: {
    main: "/api/v1/auth", // URL
    mainPath: "./Routes/api/v1/Auth", // Where the files are located
    routePostRegister: "/register", // POST Puvlic register new user
    routePostLogin: "/login", // POST Public Login user
    routeGetUser: "/", //Get Private User
  },
};
