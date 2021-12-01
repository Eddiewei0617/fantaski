express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const moment = require("moment");

//起始頁(沒做啥，確認api有沒有成功連上而已)
router.get("/", (req, res) => {
  console.log("這裡是購買紀錄");
  res.send("這裡是購買紀錄");
});

router.get("/recordlist", async (req, res) => {
  try {
    let recordlist = await connection.queryAsync(
      "SELECT * FROM ordered WHERE member_id = ? ",
      [req.session.member.id]
    );
    if (res) {
      for (let i = 0; i < recordlist.length; i++) {
        recordlist[i].created_at = moment(recordlist[i].created_at).format(
          "YYYY-MM-DD"
        );
      }
    }
    res.json(recordlist);
  } catch (e) {
    console.log("query for courseInfoList failed:", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

module.exports = router;
