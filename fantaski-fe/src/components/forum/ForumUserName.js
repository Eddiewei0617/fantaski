import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import { getPosterInfo } from "./moduleList";
import { getUserInfo } from "../../config/StatusShortcut";

function FourmUserName({ forum_id }) {
  const [poster, setPoster] = useState(null);
  const [memberInfo, setMemberInfo] = useState({
    id: 1,
    name: "Eddie",
    gender: "male",
    image: null,
  });
  useEffect(() => {
    //點進去別人文章用
    if (forum_id) {
      getPosterInfo(forum_id, setPoster);
    }
    getUserInfo(setMemberInfo);
  }, [forum_id]);

  //axios還沒好或新增／編輯文章用
  if (poster === null || poster === undefined) {
    return (
      <>
        <div className="forum-user-img">
          {/* 需規範上傳圖片的限制檔名與K數 */}
          <img
            src={`${
              memberInfo.image === null
                ? `${IMAGE_FORUM_URL}/snowman.svg`
                : `${PUBLIC_URL}/${memberInfo.image}`
            }`}
            alt="snowman-defult"
          />
        </div>
        {/* user 帳號名 */}
        <span className="forum-username">{memberInfo.name}</span>
      </>
    );
  }
  return (
    <>
      <div className="forum-user-img">
        {/* 需規範上傳圖片的限制檔名與K數 */}
        <img
          src={`${
            poster.image === null
              ? `${IMAGE_FORUM_URL}/snowman.svg`
              : `${PUBLIC_URL}/${poster.image}`
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
