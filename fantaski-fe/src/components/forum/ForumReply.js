import React, { useState, useEffect } from "react";
import ForumReplyDetail from "./ForumReplyDetail";
import { getReplyInfo } from "./moduleList";

function ForumReply({
  forumId,
  replyCount,
  modalBody,
  ifScrollDown,
  setIfScrollDown,
}) {
  const [replyList, setReplyList] = useState(null);
  useEffect(async () => {
    await getReplyInfo(forumId, setReplyList);
    if (ifScrollDown) {
      modalBody.current.scrollTop = modalBody.current.scrollHeight;
      setIfScrollDown(false);
    }
  }, [replyCount]);

  if (replyList === null) {
    return <div className="text-center m-3">尚未有人回應...</div>;
  }

  return (
    <>
      <div className="forum-reply-bg">
        <div className="forum-container">
          <div className="forum-reply-head">
            <p>
              共<span>{replyCount ? replyCount : 0}</span>則留言
            </p>
            <hr />
          </div>
          {replyList.map((singleReply, i) => {
            return (
              <>
                <ForumReplyDetail
                  key={i}
                  sequence={i + 1}
                  singleReply={singleReply}
                />
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
