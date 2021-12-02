// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
// 圖片全共用區域網址
// navbar 前面的網址
export const IMAGE_SHARE_URL =
  process.env.REACT_APP_IMAGE_SHARE_URL ||
  "http://localhost:3000/assets/images_share";

// 商品圖的前面網址
export const PRODUCTIMAGE_URL =
  process.env.REACT_APP_PRODUCTIMAGE_URL ||
  "http://localhost:3000/assets/images_product";

// 購物車圖片前面網址
export const ORDERIMAGE_URL =
  process.env.REACT_APP_ORDERIMAGE_URL ||
  "http://localhost:3000/assets/images_order";

// 課程圖片和影片網址
export const COURSE_IMG_URL =
  process.env.REACT_APP_COURSE_IMG_URL ||
  "http://localhost:3000/assets/images_course";

// 論壇圖片
export const IMAGE_FORUM_URL =
  process.env.REACT_APP_IMAGE_FORUM_URL ||
  "http://localhost:3000/assets/images_forum";

// 山的一切圖片
export const IMAGE_ROUTER_URL =
  process.env.REACT_APP_IMAGE_ROUTER_URL ||
  "http://localhost:3000/assets/images_route";

// 會員中心的圖片
export const IMAGE_MEMBER_URL =
  process.env.REACT_APP_IMAGE_MEMBER_URL ||
  "http://localhost:3000/assets/images_member";

//接後端api的網址
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// 首頁圖片
export const IMAGE_HOME_URL =
  process.env.REACT_APP_IMAGE_HOME_URL ||
  "http://localhost:3000/assets/images_home";

// 上傳檔案api
export const UPLOAD_URL =
  process.env.REACT_APP_UPLOAD_URL_URL || "http://localhost:3001";

//接後端圖片的URL
export const PUBLIC_URL =
  process.env.REACT_APP_PUBLIC_URL || "http://localhost:3001/public";

// google登入
export const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID || "please check it";

// export const GOOGLE_CLIENT_ID =
//   process.env.REACT_APP_PRODUCTIMAGE_URL ||
//   "http://localhost:3000/assets/images_product";
