const express = require("express");
const got = require("got");
const router = express.Router();

interface IData {
  last_update: string;
  source: string;
  location: string;
}

const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
/* GET home page. */
router.get("/", async function (req, res, next) {
  const result = await got("http://noah.up.edu.ph/api/four_hour_forecast");
  const body = JSON.parse(result.body);
  const data = Object.entries(groupBy(body, "last_update")).map(
    ([key, value]) => {
      const val = value as [];
      return {
        last_update: key,
        data: val.map((item: {}) => ({ ...item, last_update: undefined })),
      };
    }
  );
  res.json(data);
});

module.exports = router;
