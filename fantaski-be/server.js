const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
require("../fantaski-be/routers/auth-google");
const connection = require("./utils/db");

// google登入需要的
let app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

//開放前端權限
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// google登入 - 判斷有沒有登入成功中間鍵
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
  // console.log("req.user", req.user);
}

// 設定session存取
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    store: new FileStore({ path: path.join(__dirname, "..", "sessions") }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));

//開放public資料夾
app.use("/public", express.static("public"));

//追朔訪問紀錄
app.use((req, res, next) => {
  let current = new Date();
  // console.log(`有人來訪問at ${current.toISOString()}`);
  next();
});
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">這裡是server你好</a>');
});

// google登入--------------------------------------------------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// 點下google帳號登入時會呼叫的頁面
app.get(
  "/api/auth/callback",
  // "http://localhost:3000",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:3000",
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/failure",
  })
);
// 成功的話...
app.get("/auth/protected", isLoggedIn, async (req, res) => {
  try {
    let googleInsert = await connection.queryAsync(
      "INSERT INTO member (name, email,image, level_id, valid) VALUES (?,?,?,?,?)",
      [req.user.given_name, req.user.email, req.user.photos[0].value, 1, 1]
    );
    res.location("http://localhost:3000"); // 登入後跳轉回首頁
    res.statusCode = 301; // 配合跳轉頁面一定要加的
    res.json({ membername: req.user.given_name });
    // console.log("req.user", req.user.given_name);
  } catch (e) {
    res.json({ code: 9999, message: "資料庫讀取錯誤" });
  }
});
// 失敗的話...
app.get("/auth/failure", (req, res) => {
  res.send("something went wrong...");
});
// google登入--------------------------------------------------

//取得前端傳回json body的資料 (必寫，且須寫在前面，由上到下的順序很重要)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api路徑中間件(首頁)
let homeRouter = require("./routers/home");
app.use("/api/home", homeRouter);

//api路徑中間件(課程)
let courseRouter = require("./routers/course");
app.use("/api/course", courseRouter);

//api路徑中間件(商品)
let productRouter = require("./routers/products");
app.use("/api/products", productRouter);

//api路徑中間件(購物車)
let orderRouter = require("./routers/order");
app.use("/api/order", orderRouter);

//api路徑中間件(論壇)
let forumRouter = require("./routers/forum");
app.use("/api/forum", forumRouter);

//天氣api
let weatherRouter = require("./routers/weather");
app.use("/api/weather", weatherRouter);

// 會員api
let memberRouter = require("./routers/member");
app.use("/api/member", memberRouter);

// 登入註冊api
let authRouter = require("./routers/auth");
app.use("/api/auth", authRouter);

// 圖片檔案上傳
let memberUploadRouter = require("./routers/memberUpload");
app.use("/api/memberUpload", memberUploadRouter);

// 會員送入資料庫api
// let memberSaveRouter = require("./routers/membersave");
// app.use("/api/membersave", memberSaveRouter);
//購買紀錄
let recordRouter = require("./routers/record");
app.use("/api/record", recordRouter);

let routeRouter = require("./routers/routeline");
app.use("/api/routeline", routeRouter);

//404中間件
app.use((req, res, next) => {
  console.log("找不到網頁");
  res.status(404).send("404");
});

//非預期錯誤中間件
app.use((err, req, res, next) => {
  console.log("發生錯誤：", err);
  res.status(500).json({ code: 9999, message: "請洽系統管理員" });
});

//啟動server
app.listen(3001, () => {
  console.log("server啟動了");
});
