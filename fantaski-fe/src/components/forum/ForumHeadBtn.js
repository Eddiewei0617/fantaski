import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForumHeadBtn() {
  // 設定該項目被點選時的狀態
  let [forumHeadBtn, setForumHeadBtn] = useState("熱門");
  const handleForumHeadBtn = (e) => {
    setForumHeadBtn(e.target.innerText);
  };
  return (
    <>
      <div className="content-head-button">
        <ul className="list-unstyled">
          <li className="content-headtobutton">
            <Link
              className={`content-headtobutton-link ${
                forumHeadBtn === "熱門" && "content-headtobutton-link-active"
              }`}
              to="/forum"
              onClick={handleForumHeadBtn}
            >
              熱門
            </Link>
          </li>
          <li className="content-headtobutton">
            <Link
              className={`content-headtobutton-link ${
                forumHeadBtn === "最新" && "content-headtobutton-link-active"
              }`}
              to="/forum/news"
              onClick={handleForumHeadBtn}
            >
              最新
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ForumHeadBtn;
