const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

let app = express();

//開放前端權限
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

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

//追朔訪問紀錄
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來訪問at ${current.toISOString()}`);
  next();
});
app.get("/", (req, res) => {
  res.send("這裡是server你好");
});

//取得json資料
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//api路徑中間件(課程)
let courseRouter = require("./routers/course");
app.use("/api/course", courseRouter);

//api路徑中間件(商品)
let productRouter = require("./routers/products");
app.use("/api/products", productRouter);

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
