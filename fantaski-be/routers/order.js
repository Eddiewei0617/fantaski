express = require("express");
const router = express.Router();
const { application } = require("express");
const connection = require("../utils/db");

router.get("/", (res, req) => {
  res.send("歡迎來到購物車後台");
});
router.get("/getMemberPoints", async (req, res) => {
  try {
    let getMemberPoints = await connection.queryAsync(
      "SELECT * FROM member WHERE id = 1"
    );
    res.json(getMemberPoints);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
