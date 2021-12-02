express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { loginCheckMiddleware } = require("../middlewares/auth");

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
      "SELECT oc.course_id, oc.order_id, oc.amount, oc.comment_last_update, oc.comment, oc.star, o.member_id, m.name, m.image FROM order_course oc, ordered o, member m WHERE oc.course_id = ? AND oc.star is NOT NULL AND oc.order_id = o.id AND o.member_id = m.id ORDER BY (CASE WHEN oc.comment is NOT NULL then 0 ELSE 1 END), oc.comment_last_update DESC;",
      req.body.course_id
    );
    res.json(commentsInfoList);
  } catch (e) {
    console.log("query for commentsInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//advice + product(name+img+price+content) -->課程建議裝備api
router.post("/getadviceinfo", async (req, res) => {
  console.log("request for getAdviceinfo");
  try {
    let adviceInfoList = await connection.queryAsync(
      "SELECT p.id, p.name, p.image, p.price, p.content FROM advice a, product p WHERE a.course_id = ? AND a.product_id = p.id ORDER BY p.category_id;",
      req.body.course_id
    );
    res.json(adviceInfoList);
  } catch (e) {
    console.log("query for adviceInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//member(id) + order_course(id, amount, booking_date, star, comment) + course(name, img) + ordered(sequence) -->會員購買課程api
router.get(
  "/getmembercoursecomment",
  loginCheckMiddleware,
  async (req, res) => {
    console.log("request for getMemberCourseComment");
    try {
      let memberCourseComment = await connection.queryAsync(
        "SELECT m.id member_id, oc.amount, oc.booking_date, oc.star, oc.comment, oc.id order_course_id, c.name, c.img, c.price, o.order_no FROM member m, order_course oc, course c, ordered o WHERE m.id = ? AND m.id = o.member_id AND oc.course_id = c.id AND oc.order_id = o.id ;",
        req.session.member.id
      );
      res.json(memberCourseComment);
    } catch (e) {
      console.log("query for adviceInfoList failed:", e);
      res.json({ code: 9999, message: "資料庫讀取錯誤" });
    }
  }
);

//更新order_course 星星 -->會員更新課程評價api
router.post("/postcoursecommentstar", async (req, res) => {
  console.log("update for order_course star");
  try {
    let updateCommentStar = await connection.queryAsync(
      "UPDATE order_course SET star = ?, comment_last_update = ? WHERE id = ? ;",
      [req.body.revised_star, req.body.now, req.body.order_course_id]
    );
    res.json(updateCommentStar);
  } catch (e) {
    console.log("update for star failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});
//更新order_course  評論 -->會員更新課程評價api
router.post("/postcoursecomment", async (req, res) => {
  console.log("update for order_course comment");
  if (req.body.new_comment === "") req.body.new_comment = null;
  try {
    let updateComment = await connection.queryAsync(
      "UPDATE order_course SET comment = ?, comment_last_update = ? WHERE id = ? ;",
      [req.body.new_comment, req.body.now, req.body.order_course_id]
    );
    res.json(updateComment);
  } catch (e) {
    console.log("update for comment failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//order_course(course_id, booking_date, amount) -->取得指定期間每日剩餘名額api
router.post("/getdailycourseleft", async (req, res) => {
  console.log("query for daily course left");
  try {
    let dailyCourseLeft = await connection.queryAsync(
      "SELECT booking_date, SUM(amount) totalAmount FROM order_course WHERE course_id = ?  AND booking_date BETWEEN ? AND ? GROUP BY booking_date;",
      [req.body.course_id, req.body.date_start, req.body.date_end]
    );
    let limitAmount = await connection.queryAsync(
      "SELECT stu_limit FROM course WHERE id = ?;",
      req.body.course_id
    );
    let returnData = {
      limit: limitAmount[0],
      dailyLeft: dailyCourseLeft,
    };
    res.json(returnData);
  } catch (e) {
    console.log("update for comment failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
