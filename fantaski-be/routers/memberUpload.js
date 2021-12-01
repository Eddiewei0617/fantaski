const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const multer = require("multer");
const path = require("path");

// const { body, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // console.log("filename", image);
    const ext = file.originalname.split(".").pop();
    cb(null, `member-${Date.now()}.${ext}`);
  },
});
const uploader = multer({
  storage: storage,
  filteFilter: function (req, file, cb) {
    // console.log("fileFilter", image);
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      cb(new Error("不符合允許的檔案類型"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
router.post("/", uploader.single("image"), async (req, res) => {
  // console.log("req.body", req.body.image);
  //   console.log("req.file", req);
  try {
    let filename = req.file ? "uploads/" + req.file.filename : "";
    let result = await connection.queryAsync(
      "UPDATE  member SET image= ? WHERE id=?",
      [filename, req.session.member.id]
    );
    res.json({ code: "0", message: "已建立", id: req.session.member.id });
  } catch (e) {
    console.log(e);
    res.json({ code: "9999", message: "請洽系統管理員" });
  }
});
module.exports = router;
