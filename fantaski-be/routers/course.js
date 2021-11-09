express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", (req, res) => {
  console.log("有人訪問課程api");
  res.send("這裡是課程api");
});
router.get("/courseInfoList", async (req, res) => {
  console.log("request for courseInfoList");
  try {
    let courseInfoList = await connection.queryAsync("SELECT * FROM course");
    res.json(courseInfoList);
  } catch (e) {
    console.log("query for courseInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
