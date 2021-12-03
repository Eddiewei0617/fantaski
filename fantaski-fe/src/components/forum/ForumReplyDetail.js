import React from "react";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import moment from "moment";

function ForumReplyDetail({ singleReply, sequence }) {
  let sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm");
  let today = moment().format("YYYY-MM-DD HH:mm");
  let postTime = moment(singleReply.created_at).format("YYYY-MM-DD HH:mm");
  if (!moment(postTime).isBefore(sevenDaysAgo)) {
    //天數差單位毫秒-->分鐘
    let diffInTotalMinutes = moment(today).diff(postTime) / (1000 * 60);
    let days = Math.floor(diffInTotalMinutes / 60 / 24);
    let hours = Math.floor(diffInTotalMinutes / 60);
    let minutes = Math.floor(diffInTotalMinutes % 60);
    postTime =
      days > 0
        ? days + "天前"
        : hours > 0
        ? hours + "小時前"
        : minutes > 0
        ? minutes + "分鐘前"
        : "剛回覆";
  }
  console.log("singleReply", singleReply);

  return (
    <>
      <div className="forum-reply-content">
        <div className="reply-left">
          <div className="forum-reply-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img
              src={`${
                singleReply.image === null
                  ? `${IMAGE_FORUM_URL}/snowman.svg`
                  : singleReply.image.includes("https")
                  ? `${singleReply.image}`
                  : `${PUBLIC_URL}/${singleReply.image}`
              }`}
              alt="snowman-defult"
              className="object-fit"
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
              <span>{postTime}</span>
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
