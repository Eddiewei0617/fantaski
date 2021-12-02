import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import { getPosterInfo } from "./moduleList";
import { getUserInfo } from "../../config/StatusShortcut";

function FourmUserName({ forum_id, userInfo }) {
  const [poster, setPoster] = useState(null);
  useEffect(() => {
    //點進去別人文章用
    if (forum_id) {
      getPosterInfo(forum_id, setPoster);
    }
  }, [forum_id]);

  if (userInfo === null) {
    return <div></div>;
  } else if (forum_id && poster === null) {
    return <div></div>;
  }
  return (
    <>
      {/* 編輯文章的使用者名稱 */}
      {forum_id ? (
        <>
          <div className="forum-user-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img
              src={`${
                poster && poster.image === null
                  ? `${IMAGE_FORUM_URL}/snowman.svg`
                  : poster.image.includes("https")
                  ? `${poster.image}`
                  : `${PUBLIC_URL}/${poster.image}`
              }`}
              alt="snowman-defult"
              className="object-fit"
            />
          </div>
          {/* user 帳號名 */}
          <span className="forum-username">{poster && poster.name}</span>
        </>
      ) : (
        userInfo && (
          <>
            {/* 查看文章的發文者名稱 */}
            <div className="forum-user-img">
              {/* 需規範上傳圖片的限制檔名與K數 */}
              <img
                className="object-fit"
                src={`${
                  userInfo.image === null
                    ? `${IMAGE_FORUM_URL}/snowman.svg`
                    : userInfo.loginMethod === "thirdParty"
                    ? `${userInfo.image}`
                    : `${PUBLIC_URL}/${userInfo.image}`
                }`}
                alt="snowman-defult"
              />
            </div>
            {/* user 帳號名 */}
            <span className="forum-username">{userInfo.name}</span>
          </>
        )
      )}
    </>
  );
}

export default FourmUserName;
