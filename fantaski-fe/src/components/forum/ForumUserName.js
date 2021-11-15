import React from "react";
import { IMAGE_FORUM_URL } from "../../config/url";

function FourmUserName() {
  return (
    <>
      <div className="forum-user-img">
        {/* 需規範上傳圖片的限制檔名與K數 */}
        <img src={`${IMAGE_FORUM_URL}/snowman.svg`} alt="snowman-defult" />
      </div>
      {/* user 帳號名 */}
      <span className="forum-username">Eddie</span>
    </>
  );
}

export default FourmUserName;
