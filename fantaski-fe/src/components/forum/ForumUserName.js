import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL } from "../../config/url";
import { getPosterInfo } from "./moduleList";

function FourmUserName({ forum_id }) {
  const [poster, setPoster] = useState(null);
  useEffect(() => {
    getPosterInfo(forum_id, setPoster);
  }, [forum_id]);

  if (poster === null) {
    return <></>;
  }
  return (
    <>
      <div className="forum-user-img">
        {/* 需規範上傳圖片的限制檔名與K數 */}
        <img
          src={`${IMAGE_FORUM_URL}/${
            poster.image === "" ? "snowman.svg" : poster.image
          }`}
          alt="snowman-defult"
        />
      </div>
      {/* user 帳號名 */}
      <span className="forum-username">{poster.name}</span>
    </>
  );
}

export default FourmUserName;
