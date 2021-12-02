express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
const { loginCheckMiddleware } = require("../middlewares/auth");

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
          "SELECT id, category_id, created_at, subject, content, image, heart FROM forum WHERE valid = 1 ORDER BY heart DESC, created_at DESC;"
        );
      } else {
        //熱門+分類
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum WHERE category_id = ?  AND valid = 1 ORDER BY heart DESC, created_at DESC;",
          req.body.category_id
        );
      }
    } else {
      //最新+不分類
      if (req.body.category_id === 0) {
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum WHERE valid = 1 ORDER BY created_at DESC;"
        );
      } else {
        //最新+分類
        forumInfoList = await connection.queryAsync(
          "SELECT id, category_id, created_at, subject, content, image, heart  FROM forum WHERE category_id = ?  AND valid = 1 ORDER BY created_at DESC;",
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

// 回文資訊(query by forum_id)
router.post("/getreplyinfo", async (req, res) => {
  console.log("request for replyInfo");
  try {
    let resReplyInfo = await connection.queryAsync(
      "SELECT r.id, r.reply, r.created_at, m.name, m.image FROM reply r, member m WHERE r.forum_id = ? AND r.member_id = m.id ORDER BY created_at;",
      req.body.forum_id
    );
    res.json(resReplyInfo);
  } catch (e) {
    console.log("query for replyInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//發文者資訊(query by forum_id)
router.post("/getposterinfo", async (req, res) => {
  console.log("request for posterInfo");
  try {
    let resPosterInfo = await connection.queryAsync(
      "SELECT m.id, m.name, m.image FROM forum f, member m WHERE f.id = ? AND m.id = f.member_id;",
      req.body.forum_id
    );
    res.json(resPosterInfo);
  } catch (e) {
    console.log("query for posterInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//新增文章api
//檔案上傳設定
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    console.log("fileName", file);
    let ext = file.originalname.split(".").pop();
    cb(null, `post-${Date.now()}.${ext}`);
  },
});
const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      cb(new Error("僅能上傳jpg 或 png檔案類型的圖片"), false);
    }
    cb(null, true);
  },
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});
//加入資料庫
router.post(
  "/insertpostinfo",
  loginCheckMiddleware,
  uploader.single("image"),
  async (req, res) => {
    console.log("request for insertpostinfo");
    let filename = req.file ? "/uploads/" + req.file.filename : "";
    let now = new Date();

    try {
      let resNewPostInfo = await connection.queryAsync(
        "INSERT INTO forum (category_id, member_id, subject, content, image, heart, created_at, valid) VALUES(?);",
        [
          [
            req.body.category,
            req.session.member.id,
            req.body.subject,
            req.body.content,
            filename,
            0,
            now,
            1,
          ],
        ]
      );
      res.json({
        code: "0",
        message: "已建立文章",
        lastInsertId: resNewPostInfo.insertId,
      });
    } catch (e) {
      console.log("query for insertpostinfo failed:", e);
      res.json({ code: 9999, message: "資料庫讀取錯誤" });
    }
  }
);

//編輯文章api
router.post(
  "/updatepostinfo",
  loginCheckMiddleware,
  uploader.single("image"),
  async (req, res) => {
    console.log("request for updatepostinfo");
    let filename = req.file ? "/uploads/" + req.file.filename : "";
    let now = new Date();
    try {
      let resUpdatePostInfo = await connection.queryAsync(
        "UPDATE forum SET category_id = ? , subject = ?, content = ?, created_at=? WHERE id = ?;",
        [
          req.body.category,
          req.body.subject,
          req.body.content,
          now,
          req.body.forum_id,
        ]
      );
      //判斷req.file有沒有值，有值才update image
      if (filename) {
        let resImgPostInfo = await connection.queryAsync(
          "UPDATE forum SET image = ? WHERE id = ?;",
          [filename, req.body.forum_id]
        );
      }
      res.json({
        code: "0",
        message: "已更新文章",
      });
    } catch (e) {
      console.log("query for updatepostinfo failed:", e);
      res.json({ code: 9999, message: "資料庫讀取錯誤" });
    }
  }
);
//刪除文章api
router.post(
  "/delpostinfo",
  loginCheckMiddleware,
  uploader.single("image"),
  async (req, res) => {
    console.log("request for delPostInfo");
    let now = new Date();
    try {
      let resDelPostInfo = await connection.queryAsync(
        "UPDATE forum SET valid = 0 WHERE id = ?;",
        [req.body.forumId]
      );
      res.json({
        code: "0",
        message: "已(軟)刪除文章",
      });
    } catch (e) {
      console.log("query for delpostinfo failed:", e);
      res.json({ code: 9999, message: "資料庫讀取錯誤" });
    }
  }
);

//新增回文
router.post("/insertreplyinfo", loginCheckMiddleware, async (req, res) => {
  let now = new Date();

  console.log("request for insertReplyInfo");
  try {
    let resInsertReplyInfo = await connection.queryAsync(
      "INSERT INTO reply (member_id, forum_id, reply, created_at, valid) VALUES(?);",
      [[req.session.member.id, req.body.forum_id, req.body.reply_info, now, 1]]
    );
    res.json({ code: "0", message: "已建立" });
  } catch (e) {
    console.log("query for insertReplyInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//取得使用者是否有按該文章愛心
router.post("/getlikelist", loginCheckMiddleware, async (req, res) => {
  console.log("request for likeListInfo");
  try {
    let resLikeListInfo = await connection.queryAsync(
      "SELECT * FROM forum_like WHERE member_id = ? AND forum_id = ?;",
      [req.session.member.id, req.body.forum_id]
    );
    let result = resLikeListInfo.length > 0 ? true : false;
    res.json(result);
  } catch (e) {
    console.log("query for insertReplyInfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//新增or刪除文章愛心
router.post("/updateforumlike", loginCheckMiddleware, async (req, res) => {
  console.log("update for updateforumlike");
  try {
    if (req.body.ifAlreadyLike) {
      //如果原本已給愛心，要拿掉
      let resDel = await connection.queryAsync(
        "DELETE FROM forum_like WHERE member_id = ? AND forum_id = ? ;",
        [req.session.member.id, req.body.forum_id]
      );
      let resUpd = await connection.queryAsync(
        "UPDATE forum SET heart = heart - 1 WHERE id = ? ;",
        [req.body.forum_id]
      );
    } else {
      //如果原本沒有愛心，要新增
      let resInsert = await connection.queryAsync(
        "INSERT INTO forum_like (member_id, forum_id) VALUES(?);",
        [[req.session.member.id, req.body.forum_id]]
      );
      let resUpd = await connection.queryAsync(
        "UPDATE forum SET heart = heart + 1 WHERE id = ? ;",
        [req.body.forum_id]
      );
    }
    res.json({ code: 0, message: "已成功新增/刪除愛心" });
  } catch (e) {
    console.log("update for comment failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

//取得資料庫使用者資料
router.get("/getdbuserinfo", loginCheckMiddleware, async (req, res) => {
  console.log("update for dbuserinfo");
  try {
    let resSql = await connection.queryAsync(
      "SELECT * FROM member WHERE id = ?;",
      [req.session.member.id]
    );
    res.json(resSql[0]);
  } catch (e) {
    console.log("query for dbuserinfo failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
