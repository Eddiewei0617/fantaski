import axios from "axios";
import { API_URL } from "../../config/url";

export const forumList = {
  0: "全部",
  1: "滑雪經驗",
  2: "課程分享",
  3: "裝備體驗",
};

//論壇資訊api
export async function getForumInfo(forumCategory, setForumInfo) {
  let res = await axios.post(`${API_URL}/forum/getforuminfo`, {
    category_id: forumCategory.forumCategory,
    is_hot: forumCategory.isHot,
  });
  let resForumInfo = res.data;
  setForumInfo(resForumInfo);
}
//論壇回文資訊api
export async function getReplyInfo(forumId, setReplyList) {
  let res = await axios.post(`${API_URL}/forum/getreplyinfo`, {
    forum_id: forumId,
  });
  let resReplyInfo = res.data;
  setReplyList(resReplyInfo);
}
//論壇回文資訊api
export async function getPosterInfo(forumId, setPoster) {
  let res = await axios.post(`${API_URL}/forum/getposterinfo`, {
    forum_id: forumId,
  });
  let resPosterInfo = res.data;
  setPoster(resPosterInfo[0]);
}
