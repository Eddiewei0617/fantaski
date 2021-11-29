import React from "react";
import { Link } from "react-router-dom";

function ForumButton({ setForumCategory }) {
  return (
    <>
      {/* area1 各區塊 button 區 */}
      <div className="forum-button">
        <ul className="list-unstyled">
          <li className="buttonto-forum">
            <a
              href="#/"
              className="forum-button-link"
              onClick={() => {
                setForumCategory((cur) => {
                  return { ...cur, forumCategory: 1, isHot: true };
                });
              }}
            >
              滑雪經驗
            </a>
          </li>
          <li className="buttonto-forum">
            <a
              href="#/"
              className="forum-button-link"
              onClick={() => {
                setForumCategory((cur) => {
                  return { ...cur, forumCategory: 2, isHot: true };
                });
              }}
            >
              課程分享
            </a>
          </li>
          <li className="buttonto-forum">
            <a
              href="#/"
              className="forum-button-link"
              onClick={() => {
                setForumCategory((cur) => {
                  return { ...cur, forumCategory: 3, isHot: true };
                });
              }}
            >
              裝備體驗
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ForumButton;
