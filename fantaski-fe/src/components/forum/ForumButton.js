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
                  return { ...cur, forumCategory: 1 };
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
                  return { ...cur, forumCategory: 2 };
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
                  return { ...cur, forumCategory: 3 };
                });
              }}
            >
              裝備體驗
            </a>
          </li>
          {/* <Link className="forum-button-link" to="/forum/skiexperience">
              滑雪經驗
            </Link>
          <li className="buttonto-forum">
            <Link className="forum-button-link" to="/forum/courseshare">
              課程分享
            </Link>
          </li>
          <li className="buttonto-forum">
            <Link className="forum-button-link" to="/forum/equipment">
              裝備體驗
            </Link> */}
        </ul>
      </div>
    </>
  );
}

export default ForumButton;
