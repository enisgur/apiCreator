const express = require("express");
const router = express.Router();

const postCreateRoute = require("./postCreateRoute");

postCreateRoute(router); // POST create a new route api for user

module.exports = router;
