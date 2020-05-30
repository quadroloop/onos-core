const express = require("express");
const got = require("got");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const result = await got("http://noah.up.edu.ph/api/four_hour_forecast");
  const data = JSON.parse(result.body);
  res.json({ data });
});

module.exports = router;
