import React from "react";
import { IMAGE_FORUM_URL } from "../../config/url";

function ForumCommit() {
  return (
    <>
      <div className="forum-commit-bg">
        <div className="forum-commit-head">
          <p>
            共<span>30</span>則留言
          </p>
          <hr />
        </div>
        <div className="forum-commit-content">
          <div className="forum-commit-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img src={`${IMAGE_FORUM_URL}/snowman.svg`} alt="snowman-defult" />
            <span>Eddie</span>
          </div>
          <span>真是太有趣了!!!! 可以看到⼤腳印~或許是種幸運</span>
          <p>
            B1<span>13小時前</span>
          </p>
        </div>
        <hr />
      </div>
    </>
  );
}

export default ForumCommit;
