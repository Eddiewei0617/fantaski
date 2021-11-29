import React from "react";

import { BsHeartFill } from "react-icons/bs";

function ForumHeartCommit({ heart, replyCount }) {
  return (
    <>
      <div className="heart-commit-num">
        <div>
          <BsHeartFill className="heart-num" />
          <span>{heart}</span>
        </div>
        <div className="commit-num">
          留言數:<span>{replyCount ? replyCount : 0}</span>則
        </div>
      </div>
    </>
  );
}

export default ForumHeartCommit;
