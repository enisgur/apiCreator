const express = require("express");
const router = express.Router();

const postCreateRoute = require("./postCreateRoute");
const getRoute = require("./getRoute");

postCreateRoute(router); // POST create a new route api for user
getRoute(router); // GET route param => "route"

router.get("/:any", async (req, res) => {
  res
    .status(404)
    .json({ error: true, data: { message: "Not Found", code: "1111" } });
});
module.exports = router;
