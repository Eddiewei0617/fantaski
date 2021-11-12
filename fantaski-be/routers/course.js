express = require("express");
const router = express.Router();
const connection = require("../utils/db");
//起始頁(沒做啥，確認api有沒有成功連上而已)
router.get("/", (req, res) => {
  console.log("有人訪問課程api");
  res.send("這裡是課程api");
});

//course資料庫api  -->課程資訊
router.get("/courseinfolist", async (req, res) => {
  console.log("request for courseInfoList");
  try {
    let courseInfoList = await connection.queryAsync("SELECT * FROM course");
    res.json(courseInfoList);
  } catch (e) {
    console.log("query for courseInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//ordered + order_course (comments) + member (name) 資料庫api -->課程評論資訊
router.post("/getcommentsinfo", async (req, res) => {
  console.log("request for getCommentsInfo");
  try {
    let commentsInfoList = await connection.queryAsync(
      "SELECT oc.course_id, oc.order_id, oc.amount, oc.booking_date, oc.comment, oc.star, o.member_id, m.name, m.image FROM order_course oc, ordered o, member m WHERE course_id = ? AND oc.star is NOT NULL AND oc.order_id = o.id AND o.member_id = m.id;",
      req.body.course_id
    );
    res.json(commentsInfoList);
  } catch (e) {
    console.log("query for commentsInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//advice + product(name+img+price+content) + 課程建議裝備api
router.post("/getadviceinfo", async (req, res) => {
  console.log("request for getAdviceinfo");
  try {
    let adviceInfoList = await connection.queryAsync(
      "SELECT p.id, p.name, p.image, p.price, p.content FROM advice a, product p WHERE course_id = ? AND a.product_id = p.id ;",
      req.body.course_id
    );
    res.json(adviceInfoList);
  } catch (e) {
    console.log("query for adviceInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
