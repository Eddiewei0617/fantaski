express = require("express");
const router = express.Router();
const connection = require("../utils/db");
router.get("/", (res, req) => {
  console.log("地圖路徑主頁");
  res.json({ code: 6666, message: "地圖頁面主頁" });
});

router.get("/route", async (req, res) => {
  try {
    let routeline = await connection.queryAsync("SELECT * FROM course ");
    res.json(routeline);
  } catch (e) {
    console.log(e);
    res.json({ code: 1234, message: "地圖路徑的課程錯誤" });
  }
});
module.exports = router;
