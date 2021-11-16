import React from "react";
import { IMAGE_FORUM_URL } from "../../config/url";

function ForumReplyDetail() {
  return (
    <>
      <div className="forum-reply-content">
        <div className="reply-left">
          <div className="forum-reply-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img src={`${IMAGE_FORUM_URL}/snowman.svg`} alt="snowman-defult" />
          </div>
        </div>
        {/* reply-left end */}

        <div className="reply-right">
          <div className="reply-user-name">
            <span>Eddie</span>
          </div>
          <div className="user-reply">
            <span>真是太有趣了!!!! 可以看到⼤腳印~或許是種幸運</span>
          </div>
          <div className="reply-time">
            <p>
              B1<span>13小時前</span>
            </p>
          </div>
        </div>
        {/* reply-right end */}
      </div>
      {/* forum-reply-content end */}
      <hr />
    </>
  );
}

export default ForumReplyDetail;
