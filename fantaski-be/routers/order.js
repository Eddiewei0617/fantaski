express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { loginCheckMiddleware } = require("../middlewares/auth");

// 使用moment套件自動生成匯入資料庫的時間
const moment = require("moment");
let created_at = moment().format("YYYY-MM-DD hh:mm:ss");

router.get("/", (res, req) => {
  res.send("歡迎來到購物車後台");
});

// 拿資料庫(member)的資料給前端(為了用點數)
router.get("/getMemberPoints", loginCheckMiddleware, async (req, res) => {
  try {
    let getMemberPoints = await connection.queryAsync(
      "SELECT * FROM member WHERE id = ?",
      [req.session.member.id]
    );
    // console.log("getMemberPoints", getMemberPoints);
    res.json(getMemberPoints);
  } catch (err) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

// 接前端購物車列表的資料，並且寫進資料庫
router.post("/orderconfirm", async (req, res) => {
  if (req.body.memberId == undefined) {
    try {
      // 寫進ordered資料表 // 註!!! 訂單編號req.body.orderNumber 出來是字串，所以資料庫記得要用varchar ***
      let orderConfirm = await connection.queryAsync(
        "INSERT INTO ordered (order_no,member_id, consumption,point_used, created_at) VALUES(?,?,?,?,?) ",
        [
          req.body.orderNumber,
          0,
          req.body.pointUsed === undefined
            ? req.body.totalWithoutPoint
            : req.body.total,
          req.body.pointUsed === undefined ? 0 : req.body.pointUsed,
          created_at,
        ]
      );

      // 寫進order_product資料表
      for (let i = 0; i < req.body.orderList.length; i++) {
        if (req.body.orderList[i].category === "B") {
          let orderList = await connection.queryAsync(
            "INSERT INTO order_product (order_id, product_id, amount, booking_date, created_at, valid) VALUES(?,?,?,?,?,?) ",
            [
              orderConfirm.insertId,
              req.body.orderList[i].id.substr(2, 2),
              req.body.orderList[i].number,
              req.body.orderList[i].date,
              created_at,
              1,
            ]
          );
        }
      }
      // 寫進order_course資料表
      for (let i = 0; i < req.body.orderList.length; i++) {
        if (req.body.orderList[i].category === "A") {
          let orderList = await connection.queryAsync(
            "INSERT INTO order_course (order_id, course_id, amount, booking_date, created_at, valid) VALUES(?,?,?,?,?,?) ",
            [
              orderConfirm.insertId,
              req.body.orderList[i].id.substr(2, 1),
              req.body.orderList[i].number,
              req.body.orderList[i].date,
              created_at,
              1,
            ]
          );
        }
      }
      res.json({ result: "okok" });
    } catch (e) {
      console.error(e);
      res.json({ code: "0001", message: "接收前端資料錯誤" });
    }
  } else {
    try {
      // console.log(req.body) 出來的東西 ==>
      // {
      //   orderList: [
      //     {
      //       id: 'p-1',
      //       name: '暗黑滿點單板',
      //       category: 'B',
      //       price: '1200',
      //       image: 'http://localhost:3000/assets/images_product/allblack.jfif',
      //       date: '2021-11-15',
      //       number: '1'
      //     },
      //     {
      //       id: 'p-2',
      //       name: '可愛滿點單板',
      //       category: 'B',
      //       price: '1000',
      //       image: 'http://localhost:3000/assets/images_product/Elmo.jfif',
      //       date: '2021-11-15',
      //       number: '2'
      //     }
      //   ],
      //   orderNumber: '163722531940975',
      //   total: 3195
      // }

      // 寫進ordered資料表 // 註!!! 訂單編號req.body.orderNumber 出來是字串，所以資料庫記得要用varchar ***
      // 沒有onChange在使用點數上，到最後送出表單pointUsed會是undefined，所以要設判斷式讓傳回資料庫的資料不至於是null
      let orderConfirm = await connection.queryAsync(
        "INSERT INTO ordered (order_no,member_id, consumption,point_used, created_at) VALUES(?,?,?,?,?) ",
        [
          req.body.orderNumber,
          req.body.memberId,
          req.body.pointUsed === undefined
            ? req.body.totalWithoutPoint
            : req.body.total,
          req.body.pointUsed === undefined ? 0 : req.body.pointUsed,
          created_at,
        ]
      );

      // 寫進order_product資料表
      for (let i = 0; i < req.body.orderList.length; i++) {
        if (req.body.orderList[i].category === "B") {
          let orderList = await connection.queryAsync(
            "INSERT INTO order_product (order_id, product_id, amount, booking_date, created_at, valid) VALUES(?,?,?,?,?,?) ",
            [
              orderConfirm.insertId,
              req.body.orderList[i].id.substr(2, 2),
              req.body.orderList[i].number,
              req.body.orderList[i].date,
              created_at,
              1,
            ]
          );
        }
      }
      // 寫進order_course資料表
      for (let i = 0; i < req.body.orderList.length; i++) {
        if (req.body.orderList[i].category === "A") {
          let orderList = await connection.queryAsync(
            "INSERT INTO order_course (order_id, course_id, amount, booking_date, created_at, valid) VALUES(?,?,?,?,?,?) ",
            [
              orderConfirm.insertId,
              req.body.orderList[i].id.substr(2, 1),
              req.body.orderList[i].number,
              req.body.orderList[i].date,
              created_at,
              1,
            ]
          );
        }
      }
      res.json({ result: "okok" });
    } catch (e) {
      console.error(e);
      res.json({ code: "0001", message: "接收前端資料錯誤" });
    }
  }
});

// 接前端的剩餘點數再丟到資料庫
router.post("/pointleft", async (req, res) => {
  let { pointUsed, membersPoint, pointLeft, memberId } = req.body;
  try {
    let memberPointLeft = await connection.queryAsync(
      "UPDATE member SET point=? WHERE id=?",
      [pointUsed === undefined ? membersPoint : pointLeft, memberId]
    );
    res.json({ memberPointLeft });
  } catch (e) {
    console.error("Update for member pointLeft error:", e);
    res.json({ code: "0001", message: "接收前端資料錯誤" });
  }
});

module.exports = router;
