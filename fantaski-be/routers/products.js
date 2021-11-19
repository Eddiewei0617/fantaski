express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// 使用moment套件自動生成匯入資料庫的時間
const moment = require("moment");
let created_at = moment().format("YYYY-MM-DD hh:mm:ss a");

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

// 拿資料庫product_collection裡member_id=?的資料給前端
router.post("/collectinfo", async (req, res) => {
  try {
    let collectInfo = await connection.queryAsync(
      "SELECT * FROM product_collection WHERE member_id=?",
      [req.body.memberID]
    );
    // console.log(collectInfo);
    res.json(collectInfo);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.error("Select from product_collection error", e);
  }
});

// 接收前端商品收藏資料並傳到資料庫
router.post("/collection", async (req, res) => {
  let { memberId, isDelete, productId } = req.body;
  try {
    if (isDelete) {
      let deleteCollection = await connection.queryAsync(
        "DELETE FROM product_collection WHERE member_id=? AND product_id=?",
        [memberId, productId]
      );
    } else {
      let productCollection = await connection.queryAsync(
        "INSERT IGNORE INTO product_collection (member_id, product_id, created_at) VALUES(?,?,?)",
        [memberId, productId, created_at]
      );
    }
    res.json({ result: "collect is success" });
  } catch (e) {
    console.error("Insert to product_collection error", e);
    res.json({ code: "0001", message: "接收前端資料錯誤" });
  }
});

module.exports = router;
