express = require("express");
const router = express.Router();
const { application } = require("express");
const connection = require("../utils/db");

router.get("/", (res, req) => {
  res.send("歡迎來到商品後台");
});
// 全部商品資料
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

// 單板資料
router.get("/snowboards", async (req, res) => {
  try {
    let snowboards = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id = 1"
    );
    res.json(snowboards);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

// 雙板資料
router.get("/skis", async (req, res) => {
  try {
    let skis = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id = 2"
    );
    res.json(skis);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

// 滑雪外套資料
router.get("/jackets", async (req, res) => {
  try {
    let jackets = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id = 3"
    );
    res.json(jackets);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

// 雪鞋資料
router.get("/boots", async (req, res) => {
  try {
    let boots = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id = 4"
    );
    res.json(boots);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
