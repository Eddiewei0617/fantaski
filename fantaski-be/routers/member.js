express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", (res, req) => {
  console.log("您好歡迎光臨");
  res.send("這邊是會員頁面");
});
router.get("/memberInfo", async (req, res) => {
  try {
    let memberInfo = await connection.queryAsync(
      "SELECT * FROM member where id=1"
    );
    res.json(memberInfo);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

// 抓會員收藏資料
router.post("/membercollection", async(req,res)=>{
  try{
    let membercollection = await connection.queryAsync("SELECT product.id, product.image, product.category_id, product.name, product.content, product.price FROM product INNER JOIN product_collection ON product.id = product_collection.product_id WHERE product_collection.member_id=?", [req.body.memberId]);
    res.json(membercollection)
  }catch(e){
    console.error("fail to catch for membercollection", e);
    res.json({code:9999, message: "資料庫讀取錯誤"})
  }
})

module.exports = router;
