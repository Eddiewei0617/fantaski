import React, { useState, useEffect } from "react";
import ForumReplyDetail from "./ForumReplyDetail";
import { getReplyInfo } from "./moduleList";

function ForumReply({ forumId, reply }) {
  const [replyList, setReplyList] = useState(null);
  useEffect(() => {
    getReplyInfo(forumId, setReplyList);
  }, [forumId]);

  if (replyList === null) {
    return <div className="text-center m-3">尚未有人回應...</div>;
  }

  return (
    <>
      <div className="forum-reply-bg">
        <div className="forum-container">
          <div className="forum-reply-head">
            <p>
              共<span>{reply}</span>則留言
            </p>
            <hr />
          </div>
          {replyList.map((singleReply, i) => {
            return (
              <>
                <ForumReplyDetail key={i} singleReply={singleReply} />
              </>
            );
          })}
        </div>
        {/* forum-containe end */}
      </div>
    </>
  );
}

export default ForumReply;
