const express = require("express");
const router = express.Router();

const getTest = require("./getTest");
const postTest = require("./postTest");
const getUserRoute = require("./getUserRoute");

const dbData = require("../../../../testings/testUserDb.json");

try {
  //   if (dbData.apis[0].type === "get") {
  //     getTest(router); // GET Test
  //   }
  getUserRoute(router); // GET User route with params :user :route

  getTest(router); // GET Test

  postTest(router);

  router.all("/", (req, res) => {
    res.status(404).json({ msg: "not found!" });
  });
} catch (err) {
  router.all("/", (req, res) => {
    res.status(404).json({ msg: "not found!" });
  });
}

module.exports = router;
