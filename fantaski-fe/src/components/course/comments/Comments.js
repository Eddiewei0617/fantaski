import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { getCommentsInfo } from "../moduleList";

function Comments({ showCourse }) {
  const [commentsInfo, setCommentsInfo] = useState(null);
  //後端依據showCourse抓評論回填
  useEffect(() => {
    getCommentsInfo(showCourse, setCommentsInfo);
  }, []);

  if (commentsInfo === null || commentsInfo.length === 0) {
    return (
      <>
        <div className="comments-wrapper">
          <div className="no-comments"></div>
          <div className="no-comments-text">
            尚未有評論，立即報名課程當第一個評論的人！
          </div>
          )
        </div>
      </>
    );
  }

  return (
    <>
      <div className="comments-wrapper">
        {commentsInfo.map((commit, i) => {
          return (
            <>
              <SingleComment key={i} comment={commit} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Comments;
