express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { loginCheckMiddleware } = require("../middlewares/auth");

// 使用moment套件自動生成匯入資料庫的時間
const moment = require("moment");
let created_at = moment().format("YYYY-MM-DD hh:mm:ss a");

router.get("/", (res, req) => {
  console.log("有人訪問商品頁");
  res.send("歡迎來到商品後台");
});

// 全部商品資料
router.get("/allproducts", async (req, res) => {
  try {
    let allProducts = await connection.queryAsync("SELECT * FROM product ");
    res.json(allProducts);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.error(err);
  }
});

// 用get請求從前端來的參數(category_id)，然後前端的categoeyId如果有改變就丟回不同的資料庫資料回去
router.get("/productsInfoList/:categoryId?", async (req, res) => {
  try {
    let productsInfoList = await connection.queryAsync(
      "SELECT * FROM product WHERE category_id= ?",
      [req.params.categoryId]
    );
    // console.log("req.params", req.params);    取到--> req.params { categoryId: '點到的數字' }
    res.json(productsInfoList);
    // try {
    //   let productsInfoList = await connection.queryAsync(
    //     "SELECT * FROM product WHERE category_id= ?",
    //     [req.body.category]
    //   );
    //   console.log({ result: "very good" });
    //   res.json(productsInfoList);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.error(err);
  }
});

// 拿資料庫product_collection裡member_id=?的資料給前端
router.get("/collectinfo", loginCheckMiddleware, async (req, res) => {
  try {
    let collectInfo = await connection.queryAsync(
      "SELECT * FROM product_collection WHERE member_id=?",
      [req.session.member.id]
    );
    // console.log("collectInfo", collectInfo);
    // console.log("memberse", req.session);
    res.json(collectInfo);
    // try {
    //   let collectInfo = await connection.queryAsync(
    //     "SELECT * FROM product_collection WHERE member_id=?",
    //     [req.body.memberId]
    //   );
    //   // console.log(collectInfo);
    //   res.json(collectInfo);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.error("Select from product_collection error", e);
  }
});

// 接收前端商品收藏資料並傳到資料庫
router.post("/collection", loginCheckMiddleware, async (req, res) => {
  let { isDelete, productId } = req.body;
  try {
    if (isDelete) {
      let deleteCollection = await connection.queryAsync(
        "DELETE FROM product_collection WHERE member_id=? AND product_id=?",
        [req.session.member.id, productId]
      );
    } else {
      let productCollection = await connection.queryAsync(
        "INSERT IGNORE INTO product_collection (member_id, product_id, created_at) VALUES(?,?,?)",
        [req.session.member.id, productId, created_at]
      );
    }
    res.json({ result: "collect is success" });
  } catch (e) {
    console.error("Insert to product_collection error", e);
    res.json({ code: "0001", message: "接收前端資料錯誤" });
  }
});

// 在會員收藏頁點擊取消收藏後刪掉資料庫欄位
router.post("/cancelcollection", loginCheckMiddleware, async (req, res) => {
  let { productId } = req.body;
  try {
    let cancelCollection = await connection.queryAsync(
      "DELETE FROM product_collection WHERE member_id=? AND product_id=?",
      [req.session.member.id, productId]
    );
    res.json({ result: "成功刪除收藏資料" });
  } catch (e) {
    console.error("Delete from product_collection error", e);
    res.json({ code: "0001", message: "接收前端資料錯誤" });
  }
});

module.exports = router;
