import React from "react";
import ForumReplyDetail from "./ForumReplyDetail";

function ForumReply() {
  return (
    <>
      <div className="forum-reply-bg">
        <div className="forum-container">
          <div className="forum-reply-head">
            <p>
              共<span>30</span>則留言
            </p>
            <hr />
          </div>
          <ForumReplyDetail />
        </div>
        {/* forum-containe end */}
      </div>
    </>
  );
}

export default ForumReply;
