express = require("express");
const router = express.Router();
// const { application } = require("express");
const connection = require("../utils/db");

router.get("/", (res, req) => {
  res.send("歡迎來到商品後台");
});
// 全部商品資料
// 用post請求從前端來的參數(category_id)，然後前端的categoeyId如果有改變就丟回不同的資料庫資料回去
router.post("/productsInfoList", async (req, res) => {
  try {
    let productsInfoList = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id= ?",
      [req.body.category]
    );
    res.json(productsInfoList);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.error(err);
  }
});

module.exports = router;
