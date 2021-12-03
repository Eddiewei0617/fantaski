const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
      loginMethod: "traditional",
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

// google註冊登入
router.post("/google", async (req, res) => {
  let { email, name, imageUrl, googleId } = req.body.profileObj;
  try {
    let memberInDb = await connection.queryAsync(
      "SELECT * from member WHERE email=?",
      [email]
    );
    // console.log("memberInDb", memberInDb);
    // 如果資料庫有這個email就登入 :
    if (memberInDb.length !== 0) {
      if (memberInDb[0].google_id === googleId) {
        console.log("已用google註冊過");
        memberInDb = memberInDb[0];
        let returnMember = {
          id: memberInDb.id,
          email: memberInDb.email,
          name: memberInDb.name,
          image: imageUrl,
          point: memberInDb.point,
          loginMethod: "thirdParty",
        };
        req.session.member = returnMember;
        console.log("已使用google登入成功");
        res.json({ code: 0, message: "登入成功", member: returnMember });
      } else {
        console.log("已有email，但未註冊google");
        let googleIdInsert = await connection.queryAsync(
          "INSERT INTO member (image, google_id) VALUES (?,?)",
          [imageUrl, googleId]
        );
        let returnMember = {
          id: memberInDb.id,
          email: memberInDb.email,
          name: memberInDb.name,
          image: memberInDb.image,
          point: memberInDb.point,
          loginMethod: "thirdParty",
        };
        req.session.member = returnMember;
        res.json({ result: "Google帳號連結成功", member: returnMember });
      }
    }

    // 如果資料庫沒有這個email就註冊 :
    if (memberInDb.length === 0) {
      console.log("未註冊過");
      let googleInsert = await connection.queryAsync(
        "INSERT INTO member (name, email,image,point, level_id, google_id, valid) VALUES (?,?,?,?,?,?,?)",
        [name, email, imageUrl, 300, 1, googleId, 1]
      );
      let returnMember = {
        id: googleInsert.insertId,
        email: email,
        name: name,
        image: imageUrl,
        point: 300,
        loginMethod: "thirdParty",
      };
      req.session.member = returnMember;
      res.json({
        code: 0,
        message: "已建立帳號",
        member: returnMember,
      });
    }
  } catch (e) {
    console.error(e);
  }
});

//fb登入api
router.post("/fblogin", async (req, res) => {
  console.log("有人來用FB登入");
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE facebook_id = ?;",
      [req.body.id]
    );
    if (member.length === 0) {
      let now = new Date();
      console.log("new coming");
      try {
        let result = await connection.queryAsync(
          "INSERT INTO member (name, email, password, image, level_id, facebook_id, point, created_at, valid) VALUES (?);",
          [
            [
              req.body.name,
              "facebook",
              "facebook",
              req.body.picture.data.url,
              2,
              req.body.id,
              300,
              now,
              1,
            ],
          ]
        );
        let returnMember = {
          id: result.insertId,
          email: req.body.email,
          name: req.body.name,
          image: req.body.picture.data.url,
          point: "",
          loginMethod: "facebook",
        };
        req.session.member = returnMember;
        res.json({ code: 0, message: "已建立帳號", member: returnMember });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("old coming");
      member = member[0];
      let returnMember = {
        id: member.id,
        email: member.email,
        name: member.name,
        image: member.image,
        point: member.point,
        loginMethod: "thirdParty",
      };
      req.session.member = returnMember;
      res.json({ code: 0, message: "登入成功", member: returnMember });
    }
  } catch (e) {
    res.json({ code: 1109, message: "登入失敗" });
  }
});

module.exports = router;
