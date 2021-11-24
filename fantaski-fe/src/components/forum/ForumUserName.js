import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL } from "../../config/url";
import { getPosterInfo } from "./moduleList";

function FourmUserName({ forum_id }) {
  const [poster, setPoster] = useState(null);
  //會員id好之前先打在這，之後要判斷是否登入狀態才可以發文
  const [memberInfo, setMemberInfo] = useState({
    id: 1,
    name: "Eddie",
    gender: "male",
    image: "snowman.svg",
  });
  useEffect(() => {
    //點進去別人文章用
    if (forum_id) {
      getPosterInfo(forum_id, setPoster);
    }
  }, [forum_id]);

  //axios還沒好或新增／編輯文章用
  if (poster === null || poster === undefined) {
    return (
      <>
        <div className="forum-user-img">
          {/* 需規範上傳圖片的限制檔名與K數 */}
          <img
            src={`${IMAGE_FORUM_URL}/${
              memberInfo.image === "" ? "snowman.svg" : memberInfo.image
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
