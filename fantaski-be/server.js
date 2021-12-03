const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const connection = require("./utils/db");

let app = express();

//開放前端權限
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
  })
);

// 設定session存取
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    // 路徑位置通常是從[執行程式]的路徑看，而不是程式碼的位置
    // __dirname ==> 程式碼本身所在的位置
    store: new FileStore({ path: path.join(__dirname, "..", "sessions") }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { httpOnly: false },
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
