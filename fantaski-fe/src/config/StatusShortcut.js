import axios from "axios";
import { API_URL } from "./url";

// 查表法: 因為product資料表的category是數字，為了顯示在畫面上是文字用這招
// 商品種類:
export const CATEGORY_WORD = {
  1: "單板",
  2: "雙板",
  3: "滑雪外套",
  4: "雪鞋",
  5: "毛帽",
  6: "雪褲",
  7: "配件",
  8: "器材",
};

// 購物車種類:
export const CART_CATEGORY = {
  A: "課程購買",
  B: "裝備租賃",
};

//論壇回文資訊api
export async function getUserInfo(setUserInfo) {
  try {
    let res = await axios.get(`${API_URL}/auth/userInfo`, {
      withCredentials: true,
    });
    setUserInfo(res.data);
  } catch (e) {
    console.log(e);
  }
}
export const STATUS_LEVEL = { 1: "雪球", 2: "雪人", 3: "雪狼", 4: "雪怪" };
