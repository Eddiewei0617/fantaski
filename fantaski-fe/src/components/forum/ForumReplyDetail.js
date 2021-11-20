import React from "react";
import { IMAGE_FORUM_URL } from "../../config/url";
import moment from "moment";

function ForumReplyDetail({ singleReply, sequence }) {
  return (
    <>
      <div className="forum-reply-content">
        <div className="reply-left">
          <div className="forum-reply-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img
              src={`${IMAGE_FORUM_URL}/${
                singleReply.image === "" ? "snowman.svg" : singleReply.image
              }`}
              alt="snowman-defult"
            />
          </div>
        </div>
        {/* reply-left end */}

        <div className="reply-right">
          <div className="reply-user-name">
            <span>{singleReply.name}</span>
          </div>
          <div className="user-reply">
            <span>{singleReply.reply}</span>
          </div>
          <div className="reply-time">
            <p>
              B{sequence}
              <span>
                {moment(singleReply.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
              {/* <span>13小時前</span> */}
            </p>
          </div>
        </div>
        {/* reply-right end */}
      </div>
      {/* forum-reply-content end */}
      <hr />
    </>
  );
}

export default ForumReplyDetail;
