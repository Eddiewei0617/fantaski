const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("./auth-google");
//驗證註冊資料
const { body, validationResult } = require("express-validator");
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度至少為 6"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

//註冊api
router.post("/register", registerRules, async (req, res) => {
  console.log("有人來註冊");
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    let error = validateResult.array();
    return res.json({ code: 99, message: error });
  }
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE email = ? ;",
      req.body.email
    );
    if (member.length > 0) {
      return res.json({ code: 1101, message: "該email已註冊" });
    }
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let now = new Date();
    let result = await connection.queryAsync(
      "INSERT INTO member (name, email, password, point,level_id, created_at, valid) VALUES (?);",
      [[req.body.name, req.body.email, hashPassword, 300, 2, now, 1]]
    );
    res.json({ code: 0, message: "已建立帳號" });
  } catch (e) {
    console.error(e);
    res.json({ code: 9999, message: "請洽系統管理員" });
  }
});

//登入api
router.post("/login", async (req, res) => {
  console.log("有人來登入");
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE email = ?;",
      [req.body.email]
    );
    if (member.length === 0) {
      res.json({ code: 1102, message: "帳號錯誤" });
    }
    member = member[0];

    let result = await bcrypt.compare(req.body.password, member.password);
    if (!result) {
      res.json({ code: 1102, message: "密碼錯誤" });
    }
    let returnMember = {
      id: member.id,
      email: member.email,
      name: member.name,
      image: member.image,
      point: member.point,
    };
    req.session.member = returnMember;
    res.json({ code: 0, message: "登入成功", member: returnMember });
  } catch (e) {
    res.json({ code: 1109, message: "登入失敗" });
  }
});

//登出
router.get("/logout", async (req, res) => {
  console.log("query for logout");
  try {
    req.session.member = null;
    res.json({ code: 1201, message: "登出成功" });
  } catch (e) {
    res.json({ code: 9999, message: "登出失敗，請洽系統管理員" });
  }
});

//確認是否登入
router.get("/userInfo", async (req, res) => {
  console.log("query for userInfo");
  if (req.session.member) {
    res.json(req.session.member);
  } else {
    res.json({ code: 1201, message: "尚未登入" });
  }
});

// google登入
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
  //   console.log("req.user", req.user);
}
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] }),
//   async (req, res) => {
//     console.log("connect to backend");
//     console.log("req.user", req.user);
//     res.json(req.user);
//   }
// );
// router.get(
//   "/callback",
//   passport.authenticate("google", {
//     successRedirect: "/api/auth/protected",
//     failureRedirect: "/api/auth/failure",
//   })
// );
// router.get("/failure", (req, res) => {
//   res.send("something went wrong...");
// });
// router.get("/protected", isLoggedIn, (req, res) => {
//   res.send("Hello!");
// });

module.exports = router;
