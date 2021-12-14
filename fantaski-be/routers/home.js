const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// 使用 moment 套件自動生成匯入資料庫的時間
const moment = require("moment");
let created_at = moment().format("YYYY-MM-DD hh:mm:ss a");

// 起始頁(沒做啥，確認api有沒有成功連上而已)
router.get("/", (req, res) => {
  console.log("有人訪問首頁api");
  res.send("這裡是首頁api");
});

// s1 價錢 星星數 & 剩餘人數
router.get("/idxcoursepricerateremain", async (req, res) => {
  try {
    let idxCoursePriceRateRemain = await connection.queryAsync(`
    SELECT c.id,
           c.name,
           c.price,
           IFNULL(ROUND(SUM(oc2.star)/COUNT(oc2.id)),0) averageRate,
           IFNULL(oc1.SignUp, 0) signupTotalToday,
           IF(c.stu_limit - IFNULL(oc1.SignUp, 0) < 0, 0, c.stu_limit - IFNULL(oc1.SignUp, 0)) signupRemainToday
    FROM course c
    LEFT JOIN (
        SELECT course_id,
               SUM(amount) SignUp
        FROM order_course
        WHERE DATE_FORMAT(booking_date, '%Y-%m-%d') = DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d') AND valid = 1
        GROUP BY course_id
        ) oc1
    ON oc1.course_id = c.id
    LEFT JOIN order_course oc2
    ON oc2.course_id = c.id
    WHERE c.valid = 1 and c.id != 5
    GROUP BY c.id;
    `);
    res.json(idxCoursePriceRateRemain);
  } catch (err) {
    console.error("query for idxCoursePriceRateRemain failed:", err);
    res.json({ code: 9999, message: "資料庫讀取失敗" });
  }
});

// s1-1 學員分享說 --> 取得 forum & member 資料庫 api
router.get("/indexforumconent", async (req, res) => {
  try {
    let indexForumConent = await connection.queryAsync(`
    SELECT  f.id, 
            f.category_id, 
            f.content,
            m.name,
            m.image,
            f.created_at
    FROM forum f
    JOIN member m
    ON f.member_id = m.id
    WHERE f.category_id = 2 AND f.valid =1
    ORDER BY f.created_at DESC
    LIMIT 3;
      `);

    const color = ["#559360", "#F50505", "#000000"];
    for (let i = 0; i < indexForumConent.length; i++) {
      indexForumConent[i]["pathColor"] = color[i];
    }
    res.json(indexForumConent);
  } catch (err) {
    console.error("query for indexForumConent failed:", err);
    res.json({ code: 9999, message: "資料庫讀取失敗" });
  }
});

//  s3 首頁商品 --> 取得 product 資料庫 api
router.get("/indexrent", async (req, res) => {
  try {
    let indexRent = await connection.queryAsync(`
    SELECT  p.id,
            p.name AS 'title',
            p.image,
            p.price,
            cp.name,
            (CASE WHEN p.category_id BETWEEN 1 AND 2 THEN '雪板類'
                  WHEN p.category_id BETWEEN 3 AND 6 THEN '服飾類'
                  WHEN p.category_id BETWEEN 7 AND 8 THEN '裝備類' END) AS 'type'
    FROM product p
    JOIN category_product cp
    ON p.category_id = cp.id
      `);
    res.json(indexRent);
  } catch (err) {
    console.error("query for indexRent failed:", err);
    res.json({ code: 9999, message: "資料庫讀取失敗" });
  }
});

//  s4 首頁論壇最新文章 --> 取得 forum & reply 資料庫 api
router.get("/indexforumnews", async (req, res) => {
  try {
    let indexForumNews = await connection.queryAsync(
      `
    SELECT  f.id,
            f.category_id,
            f.subject,
            f.content,
            DATE_FORMAT(f.created_at,'%Y-%m-%d %H:%i:%s') AS 'created_at',
            COUNT(r.reply) AS 'replyNum'
    FROM forum f
    LEFT JOIN reply r
    ON f.id = r.forum_id
    WHERE f.valid = 1
    GROUP BY f.id
    ORDER BY f.created_at DESC, COUNT(r.reply) DESC
    LIMIT 2;
    `,
      [req.params.forumId]
    );
    res.json(indexForumNews);
  } catch (err) {
    console.error("query for indexForumNews failed:", err);
    res.json({ code: 9999, message: "資料庫讀取失敗" });
  }
});

//  s4 首頁論壇熱門文章 --> 取得 forum & reply 資料庫 api
router.get("/indexforumhot", async (req, res) => {
  try {
    let indexForumHot = await connection.queryAsync(`
    SELECT  f.id,
	          f.category_id,
            f.subject,
            f.content,
            DATE_FORMAT(f.created_at,'%Y-%m-%d %H:%i:%s') AS created_at,
            f.heart,
            COUNT(r.reply) AS 'replyNum'
    FROM forum f
    JOIN reply r
    ON f.id = r.forum_id
    WHERE f.valid = 1
    GROUP BY f.id
    ORDER BY f.heart DESC, COUNT(r.reply) DESC
    LIMIT 2;
      `);
    res.json(indexForumHot);
  } catch (err) {
    console.error("query for indexForumHot failed:", err);
    res.json({ code: 9999, message: "資料庫讀取失敗" });
  }
});

module.exports = router;
