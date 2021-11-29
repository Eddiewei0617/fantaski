express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const moment = require("moment");
const bcrypt = require("bcrypt");
router.get("/", (res, req) => {
  console.log("您好歡迎光臨");
  res.send("這邊是會員頁面");
});
// 檢查進來的東西
const { body, validationResult } = require("express-validator");
const registerRules = [
  // body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度至少為 6"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

router.get("/memberInfo", async (req, res) => {
  try {
    let memberInfo = await connection.queryAsync(
      "SELECT * FROM member where id=3"
    );
    if (res) {
      memberInfo[0].birthday = moment(memberInfo[0].birthday).format(
        "YYYY-MM-DD"
      );
    }
    res.json(memberInfo);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

router.post("/memberSave", async (req, res) => {
  // console.log("req.body", req.body);
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET gender=? , birthday=?  WHERE id =?",
      [req.body.gender, req.body.memberbirthday, 3]
    );
  } catch (e) {
    console.log("錯誤了喔", e);
  }

  res.json({ result: "okok" });
});

router.post("/updataImg", async (req, res) => {
  console.log("req.body", req.body);
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET image=? WHERE id =?",
      [req.body.image, id]
    );
  } catch (e) {
    console.log("錯誤了喔", e);
  }
  res.json({ result: "123OK" });
});

router.post("/memberupdate", async (req, res) => {
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET name=?, birthday=?,gender=?, email=? WHERE id=?",
      [req.body.name, req.body.birthday, req.body.gender, req.body.email, 3]
    );
  } catch (e) {
    console.log("沒有抓到會員修改的東西");
  }
  res.json({ result: "123OK" });
});

router.post("/memberPassword", registerRules, async (req, res) => {
  // 東西驗證
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的，那表示有欄位沒有通過驗證
    let error = validateResult.array();
    return res.status(400).json({ code: 99, message: error });
  }
  try {
    // let hashPassword = await bcrypt.hash(req.body.password, 10);
    let data = await connection.queryAsync(
      "UPDATE member SET password=? WHERE id=?",
      [req.body.password, 3]
      // [hashPassword, 3]
    );
  } catch (e) {
    console.log("沒有抓到會員修改的東西");
  }
  res.json({ result: "密碼修改成功OK" });
});
// 購買紀錄
router.get("/memberRecord", async (req, res) => {
  try {
    let ordered = await connection.queryAsync(
      "SELECT * FROM ordered WHERE member_id=? ",
      1
    );
    let id = ordered[0].id;
    for (i = 0; i < ordered.length; i++) {
      console.log(ordered[i].id);
      let orderedCourseList = [];
      let order_course = await connection.queryAsync(
        "SELECT * FROM order_course WHERE order_id=? ",
        ordered[i].id
      );
      let order_product = await connection.queryAsync(
        "SELECT * FROM order_product WHERE id=? ",
        ordered[i].id
      );
    }

    let all_data = [...ordered, ...order_course, ...order_product];
    // let dataCourse = await connection.queryAsync(
    //   "SELECT * FROM order_course WHERE course_id= ",

    // );
    res.json(all_data);
  } catch (e) {
    console.log("沒有抓到會員紀錄的東西");
  }
});
module.exports = router;
