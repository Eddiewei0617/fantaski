import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CommentInMember from "./CommentInMember";
import { getMemberCourseComment } from "../../course/moduleList";

function CommentsInMember({ setShowCourse, userInfo }) {
  const [memberCourseComment, setMemberCourseComment] = useState(null);
  useEffect(() => {
    if (userInfo) {
      getMemberCourseComment(setMemberCourseComment);
    }
  }, [userInfo]);
  if (memberCourseComment === null || memberCourseComment.length === 0) {
    return (
      <div className="text-center">
        <div className="m-3">尚未購買課程哦...</div>
        <div className="m-3">點選課程資訊到課程頁逛逛</div>
        <Link
          to={`/course/beginner`}
          onClick={() => {
            setShowCourse("初體驗");
          }}
        >
          課程資訊
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="order-comments-wrapper">
        <div className="member-comments-title row text-center">
          <div className="col-2">課程圖片</div>
          <div className="col-4">報名資訊</div>
          <div className="col-4">我的評論</div>
          <div className="col-2"></div>
        </div>

        {memberCourseComment.map((orderCourse, i) => {
          return (
            <>
              <CommentInMember
                setShowCourse={setShowCourse}
                key={i}
                orderCourse={orderCourse}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default CommentsInMember;
