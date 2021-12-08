import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import { getUserInfo } from "../../config/StatusShortcut";
import { insertReplyInfo, getDbUserInfo } from "./moduleList";
import Swal from "sweetalert2";

function ForumAddReply({
  forum_id,
  replyCount,
  setReplyCount,
  replyList,
  setIfScrollDown,
  userInfo,
}) {
  const [replyContent, setReplyContent] = useState("");
  const [userFromDb, setUserFromDb] = useState(null);

  useEffect(() => {
    getDbUserInfo(setUserFromDb);
  }, []);

  function handleChange(e) {
    setReplyContent(e.target.value);
  }
  async function handleSubmit() {
    if (replyContent === "") {
      Swal.fire("回覆內容不可空白哦！");

      return;
    } else {
      setIfScrollDown(true);
      await insertReplyInfo(forum_id, replyContent);
      setReplyContent("");
      setReplyCount(replyCount + 1);
      replyList[forum_id] = replyCount + 1;
    }
  }
  if (userInfo === null) {
    return <></>;
  }
  if (userInfo.code === 1201 || userFromDb === null) {
    return <div>請先登入後才能回覆哦</div>;
  }
  return (
    <>
      <div className="reply-area">
        <label className="m-3 forum-reply-img">
          <img
            src={`${
              userFromDb.image === null
                ? `${IMAGE_FORUM_URL}/snowman.svg`
                : userFromDb.image.includes("https")
                ? `${userFromDb.image}`
                : `${PUBLIC_URL}/${userFromDb.image}`
            }`}
            alt="snowman-defult"
            className="object-fit"
          />
        </label>
        <input
          type="text"
          value={replyContent}
          placeholder="新增留言:"
          required
          onChange={handleChange}
        />
        <button type=" button" className="reply-submit" onClick={handleSubmit}>
          新增
        </button>
      </div>
    </>
  );
}

export default ForumAddReply;
