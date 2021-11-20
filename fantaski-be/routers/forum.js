express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.post("/", (req, res) => {
  console.log("有人訪問課程api");
  res.send("這裡是課程api");
});

//forum資料庫api  -->論壇資訊
router.post("/getforuminfo", async (req, res) => {
  console.log("request for forumInfo");
  try {
    let forumInfoList;
    if (req.body.is_hot) {
      if (req.body.category_id === 0) {
        //熱門+不分類
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart FROM forum ORDER BY heart DESC;"
        );
      } else {
        //熱門+分類
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum WHERE category_id = ? ORDER BY heart DESC;",
          req.body.category_id
        );
      }
    } else {
      //最新+不分類
      if (req.body.category_id === 0) {
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum ORDER BY created_at DESC;"
        );
      } else {
        //最新+分類
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum WHERE category_id = ? ORDER BY created_at DESC;",
          req.body.category_id
        );
      }
    }
    let replyCounts = await connection.queryAsync(
      "SELECT forum_id, COUNT(*) replyCount FROM reply WHERE valid = 1 GROUP BY forum_id;"
    );

    let replyList = {};
    for (let i = 0; i < replyCounts.length; i++) {
      let forumId = replyCounts[i].forum_id;
      let replyCount = replyCounts[i].replyCount;
      replyList[forumId] = replyCount;
    }
    res.json({ postList: forumInfoList, reply: replyList });
  } catch (e) {
    console.log("query for forumInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

router.post("/getreplyinfo", async (req, res) => {
  console.log("request for replyInfo");
  try {
    let resReplyInfo = await connection.queryAsync(
      "SELECT r.id, r.reply, r.created_at, m.name, m.image FROM reply r, member m WHERE r.forum_id = ? AND r.member_id = m.id ORDER BY created_at DESC;",
      req.body.forum_id
    );
    res.json(resReplyInfo);
  } catch (e) {
    console.log("query for replyInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

router.post("/getposterinfo", async (req, res) => {
  console.log("request for posterInfo");
  try {
    let resPosterInfo = await connection.queryAsync(
      "SELECT m.name, m.image FROM forum f, member m WHERE f.id = ? AND m.id = f.member_id;",
      req.body.forum_id
    );
    res.json(resPosterInfo);
  } catch (e) {
    console.log("query for posterInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
