import axios from "axios";
import { API_URL } from "../../config/url";

export const forumList = {
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
//論壇發文資訊api
export async function getPosterInfo(forumId, setPoster) {
  let res = await axios.post(`${API_URL}/forum/getposterinfo`, {
    forum_id: forumId,
  });
  let resPosterInfo = res.data;
  setPoster(resPosterInfo[0]);
}
//論壇新增文章api
export async function insertPostInfo(postInfo) {
  let res = await axios.post(`${API_URL}/forum/insertpostinfo`, postInfo, {
    withCredentials: true,
  });
}
//論壇編輯文章api
export async function updatePostInfo(postInfo) {
  let res = await axios.post(`${API_URL}/forum/updatepostinfo`, postInfo, {
    withCredentials: true,
  });
}
//論壇刪除文章api
export async function delPostInfo(forumId) {
  let res = await axios.post(
    `${API_URL}/forum/delpostinfo`,
    {
      forumId: forumId,
    },
    {
      withCredentials: true,
    }
  );
}
//論壇新增回覆api
export async function insertReplyInfo(forum_id, replyInfo) {
  let res = await axios.post(
    `${API_URL}/forum/insertreplyinfo`,
    {
      forum_id: forum_id,
      reply_info: replyInfo,
    },
    {
      withCredentials: true,
    }
  );
}
//使用者是否點擊該文章愛心過 true/false
export async function getLikeList(forum_id, setIfLike) {
  let res = await axios.post(
    `${API_URL}/forum/getlikelist`,
    {
      forum_id: forum_id,
    },
    {
      withCredentials: true,
    }
  );
  let resLikeListInfo = res.data;
  setIfLike(resLikeListInfo);
}
//文章愛心新增/刪除
export async function updateForumLike(forum_id, ifAlreadyLike) {
  let res = await axios.post(
    `${API_URL}/forum/updateforumlike`,
    {
      forum_id: forum_id,
      ifAlreadyLike: ifAlreadyLike,
    },
    {
      withCredentials: true,
    }
  );
}
//從資料庫取得使用者資料
export async function getDbUserInfo(setState) {
  let res = await axios.get(`${API_URL}/forum/getdbuserinfo`, {
    withCredentials: true,
  });
  setState(res.data);
}
