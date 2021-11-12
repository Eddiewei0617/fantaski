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

export const IMAGE_ROUTER_URL =
  process.env.REACT_APP_IMAGE_ROUTER_URL ||
  "http://localhost:3000/assets/images_route";

export const IMAGE_MEMBER_URL =
  process.env.REACT_APP_IMAGE_MEMBER_URL ||
  "http://localhost:3000/assets/images_member";

//皆後端api的網址
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";
