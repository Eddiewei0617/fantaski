express = require("express");
const router = express.Router();
const { application } = require("express");
const connection = require("../utils/db");

router.get("/", (res, req) => {
  res.send("歡迎來到商品後台");
});
router.get("/productsInfoList", async (req, res) => {
  try {
    let productsInfoList = await connection.queryAsync(
      "SELECT * FROM product WHERE valid = 1"
    );
    res.json(productsInfoList);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
