import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForumHeadBtn({ setForumCategory }) {
  // 設定該項目被點選時的狀態
  let [forumHeadBtn, setForumHeadBtn] = useState("熱門");
  const handleForumHeadBtn = (e) => {
    let innerText = e.target.innerText;
    setForumHeadBtn(innerText);
    if (innerText === "最新") {
      setForumCategory((cur) => {
        return { ...cur, isHot: false };
      });
    } else {
      setForumCategory((cur) => {
        return { ...cur, isHot: true };
      });
    }
  };
  return (
    <>
      <div className="content-head-button">
        <ul className="list-unstyled">
          <li className="content-headtobutton">
            <a
              className={`content-headtobutton-link ${
                forumHeadBtn === "熱門" && "content-headtobutton-link-active"
              }`}
              href="#/"
              onClick={handleForumHeadBtn}
            >
              熱門
            </a>
          </li>
          <li className="content-headtobutton">
            <a
              className={`content-headtobutton-link ${
                forumHeadBtn === "最新" && "content-headtobutton-link-active"
              }`}
              href="#/"
              onClick={handleForumHeadBtn}
            >
              最新
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ForumHeadBtn;
