express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { loginCheckMiddleware } = require("../middlewares/auth");
router.get("/", (res, req) => {
  console.log("您好歡迎光臨");
  res.send("這邊是會員頁面");
});
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
router.get("/memberInfo", loginCheckMiddleware, async (req, res) => {
  try {
    let memberInfo = await connection.queryAsync(
      "SELECT * FROM member where id=?",
      [req.session.member.id]
    );
    // console.log("memberInfo", memberInfo);
    if (res) {
      memberInfo[0].birthday = moment(memberInfo[0].birthday).format(
        "YYYY-MM-DD"
      );
    }
    res.json(memberInfo);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
    console.log(req.session.member.id);
  }
});

// 抓會員收藏資料(傳駿)
router.get("/membercollection", loginCheckMiddleware, async (req, res) => {
  try {
    let membercollection = await connection.queryAsync(
      "SELECT product.id, product.image, product.category_id, product.name, product.content, product.price FROM product INNER JOIN product_collection ON product.id = product_collection.product_id WHERE product_collection.member_id=? ORDER BY product_collection.created_at DESC",
      [req.session.member.id]
    );
    res.json(membercollection);
  } catch (e) {
    console.error("fail to catch for membercollection", e);
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});

router.post("/membersave", async (req, res) => {
  // console.log("req.body", req.body);
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET gender=? , birthday=?  WHERE id =?",
      [req.body.gender, req.body.memberbirthday, req.session.member.id]
    );
  } catch (e) {
    console.log("錯誤了喔", e);
  }

  res.json({ result: "okok" });
});

router.get("/aaa", async (req, res) => {
  let confirmEmail = await connection.queryAsync("SELECT * FROM member");
  res.json(confirmEmail);
});

router.post("/memberupdate", async (req, res) => {
  let confirmEmail = await connection.queryAsync(
    "SELECT * FROM member WHERE email=?",
    [req.body.email]
  );
  // console.log(confirmEmail.length);
  // console.log("confirmEmail", confirmEmail[0].email);
  // if (confirmEmail.length > 0) {
  //   res.json({ message: "有相同的電子信箱囉", result: "false" });
  // } else {
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET name=?, birthday=?,gender=?, email=? WHERE id=?",
      [
        req.body.name,
        req.body.birthday,
        req.body.gender,
        req.body.email,
        req.session.member.id,
      ]
    );
    res.json({ message: "修改成功", result: "true" });
  } catch (e) {
    console.log("沒有抓到會員修改的東西", e);
  }
});

router.post("/memberPassword", async (req, res) => {
  // 東西驗證

  try {
    console.log("req.body.oldpassword", req.body.oldpassword);
    // console.log("check[0].password", req.body.check[0]);
    console.log("password", req.body.password);
    console.log("req.body.confirmPassword", req.body.confirmPassword);
    // let check = await connection.queryAsync(
    //   "SELECT password FROM member WHERE email=?",
    //   [req.session.member.email]
    // );
    // if (req.body.password === req.body.confirmPassword) {
    //   console.log("true");
    // } else {
    //   console.log("false");
    // }
    // let result = await bcrypt.compare(
    //   req.body.password,
    //   req.body.confirmPassword
    // );
    // console.log("result", result);
    if (req.body.password === req.body.confirmPassword) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      let data = await connection.queryAsync(
        "UPDATE member SET password=? WHERE id=?",
        // [req.body.password, req.session.member.id]
        [hashPassword, req.session.member.id]
      );
      res.json({ message: "密碼修改成功OK", result: true });
    } else {
      res.json({ message: "密碼輸入錯誤", result: false });
    }
  } catch (e) {
    console.log("沒有抓到會員修改的東西", e);
  }
});
// 購買紀錄

router.get("/memberRecord", async (req, res) => {
  try {
    let memberOrder = await connection.queryAsync(
      "SELECT * FROM ordered WHERE member_id=?",
      // [8]
      [req.session.member.id]
    );
    console.log(memberOrder);
    let orderCourse = {};
    for (i = 0; i < memberOrder.length; i++) {
      orderCourse[memberOrder[i].id] = [];
      let orderItems = await connection.queryAsync(
        "SELECT order_course.*,course.img AS image ,course.price FROM  order_course JOIN course  ON order_course.course_id = course.id  WHERE order_id=?",

        [memberOrder[i].id]
      );
      // orderItems.push(orderCourse[0]);
      for (let j = 0; j < orderItems.length; j++) {
        orderCourse[memberOrder[i].id].push(orderItems[j]);
      }
    }
    let orderProduct = {};
    for (i = 0; i < memberOrder.length; i++) {
      orderProduct[memberOrder[i].id] = [];
      let orderItems = await connection.queryAsync(
        "SELECT order_product.* , product.name AS product_name , product.image AS image ,product.price AS price  FROM  order_product JOIN product ON order_product.product_id = product.id WHERE order_id=?",
        [memberOrder[i].id]
      );
      // orderItems.push(orderCourse[0]);
      for (let j = 0; j < orderItems.length; j++) {
        orderProduct[memberOrder[i].id].push(orderItems[j]);
      }
    }

    let result = {
      orders: memberOrder,
      orderCourse: orderCourse,
      orderProduct: orderProduct,
    };
    res.json(result);
  } catch (e) {
    console.log("購買紀錄錯誤", e);
  }
});

router.post("/updataImg", async (req, res) => {
  console.log("req.body", req.body);
  try {
    let data = await connection.queryAsync(
      "UPDATE member SET image=? WHERE id =?",
      [req.body.image, req.session.member.id]
    );
  } catch (e) {
    console.log("錯誤了喔", e);
  }
  res.json({ result: "123OK" });
});

// 接論壇管理的api
router.get("/memberArticle", async (req, res) => {
  try {
    let data = await connection.queryAsync(
      "SELECT * FROM forum WHERE member_id=? AND valid=1 ORDER BY created_at DESC",
      // [3]
      [req.session.member.id]
    );
    if (res) {
      for (let i = 0; i < data.length; i++) {
        data[i].created_at = moment(data[i].created_at).format("YYYY-MM-DD");
      }
    }
    res.json(data);
  } catch (e) {
    console.log("論壇錯誤", e);
  }
});

router.get("/memberRecord", async (req, res) => {
  try {
    let memberOrder = await connection.queryAsync(
      "SELECT * FROM ordered WHERE member_id=?",
      // [3]
      [req.session.member.id]
    );
    if (res) {
      for (let i = 0; i < memberOrder.length; i++) {
        memberOrder[i].created_at = moment(memberOrder[i].created_at).format(
          "YYYY-MM-DD"
        );
      }
    }
    console.log(memberOrder);
    let orderCourse = {};
    for (let i = 0; i < memberOrder.length; i++) {
      orderCourse[memberOrder[i].id] = [];
      let orderItems = await connection.queryAsync(
        "SELECT order_course.*, course.img AS image,course.price FROM  order_course JOIN course ON order_course.course_id = course.id  WHERE order_id=?",
        [memberOrder[i].id]
      );
      // let (res){
      //   for(i=0;i<orderCourse[].length;i++){
      //     for(i=0;i<orderCourse[memberOrder[i].id.length];i++){
      //       orderCourse[memberOrder[i].id.length].booking_date = moment(orderCourse[memberOrder[i].id.length].booking_date).format("YYYY-MM-DD");
      //     }
      //   }
      // }
      // orderItems.push(orderCourse[0]);
      for (let j = 0; j < orderItems.length; j++) {
        orderCourse[memberOrder[i].id].push(orderItems[j]);
      }
    }
    let orderProduct = {};
    for (let i = 0; i < memberOrder.length; i++) {
      orderProduct[memberOrder[i].id] = [];
      let orderItems = await connection.queryAsync(
        "SELECT order_product.* , product.name AS product_name , product.image  AS image,product.price AS price FROM  order_product JOIN product ON order_product.product_id = product.id  WHERE order_id=?",
        [memberOrder[i].id]
      );
      // orderItems.push(orderCourse[0]);
      for (let j = 0; j < orderItems.length; j++) {
        orderProduct[memberOrder[i].id].push(orderItems[j]);
      }
    }

    let result = {
      orders: memberOrder,
      orderCourse: orderCourse,
      orderProduct: orderProduct,
    };
    res.json(result);
  } catch (e) {
    console.log("購買紀錄錯誤", e);
  }
});
module.exports = router;
