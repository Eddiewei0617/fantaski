import React from "react";

import { BsHeartFill } from "react-icons/bs";

function ForumHeartCommit() {
  return (
    <>
      <div className="heart-commit-num">
        <div>
          <BsHeartFill className="heart-num" />
          <span>999</span>
        </div>
        <div className="commit-num">
          留言數:<span>30</span>則
        </div>
      </div>
    </>
  );
}

export default ForumHeartCommit;
