import React from "react";
import { IMAGE_FORUM_URL } from "../../config/url";

function ForumAddReply() {
  return (
    <>
      <div className="reply-area">
        <label className="m-3 forum-reply-img">
          <img src={`${IMAGE_FORUM_URL}/snowman.svg`} alt="snowman-defult" />
        </label>
        <input
          type="text"
          name="reply" // 給Formdata使用
          value=""
          placeholder="新增留言:"
          required
        />
        <button type="submit" className="reply-submit">
          新增
        </button>
      </div>
    </>
  );
}

export default ForumAddReply;
