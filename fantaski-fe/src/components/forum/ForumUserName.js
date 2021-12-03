import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import { getPosterInfo, getDbUserInfo } from "./moduleList";

function FourmUserName({ forum_id, userInfo }) {
  const [poster, setPoster] = useState(null);
  const [userFromDb, setUserFromDb] = useState(null);
  useEffect(() => {
    //點進去別人文章用
    if (forum_id) {
      getPosterInfo(forum_id, setPoster);
    } else if (userInfo && userInfo.code !== 1201) {
      getDbUserInfo(setUserFromDb);
    }
  }, [forum_id]);

  if (userInfo === null) {
    return <div>userInfo資料還沒載入</div>;
  } else if (forum_id && poster === null) {
    return <div>poster資料還沒載入</div>;
  } else if (!forum_id && userInfo.code !== 1201 && userFromDb === null) {
    return <div>userFromDb資料還沒載入</div>;
  }
  return (
    <>
      {/* 誰在編輯、誰發的文 */}
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
            />
          </div>
          {/* user 帳號名 */}
          <span className="forum-username">{poster && poster.name}</span>
        </>
      ) : (
        userInfo && (
          <>
            {/* 誰要發文 */}
            <div className="forum-user-img">
              {/* 需規範上傳圖片的限制檔名與K數 */}
              <img
                className="object-fit"
                src={`${
                  userFromDb.image === null
                    ? `${IMAGE_FORUM_URL}/snowman.svg`
                    : userFromDb.image.includes("https")
                    ? `${userFromDb.image}`
                    : `${PUBLIC_URL}/${userFromDb.image}`
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
