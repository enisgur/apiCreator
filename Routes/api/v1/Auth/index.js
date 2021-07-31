const express = require("express");
const router = express.Router();

const postLogin = require("./Login");
const postRegister = require("./Register");
const getUser = require("./GetUser");

postLogin(router); // POST Login
postRegister(router); // POST Register
getUser(router); // GET logged-in admin user

module.exports = router;
