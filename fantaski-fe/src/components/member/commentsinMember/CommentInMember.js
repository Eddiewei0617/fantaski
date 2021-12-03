import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { COURSE_IMG_URL } from "../../../config/url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  starMapping,
  courseIdName,
  postCourseCommentStar,
  postCourseComment,
} from "../../course/moduleList";
import moment from "moment";
import Swal from "sweetalert2";

function CommentInMember({ orderCourse, setShowCourse }) {
  const [isStarsClick, setIsStarsClick] = useState(orderCourse.star);
  const [isStarsHover, setIsStarsHover] = useState(false);
  const [contentInTextarea, setContentInTextarea] = useState(
    orderCourse.comment
  );
  let now = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");

  function handleStarClick(e) {
    let starId = e.currentTarget.id;
    let starIndex = starId.split("-").pop();
    setIsStarsClick(starIndex);
    orderCourse.star = starIndex;
    let order_course_id = e.currentTarget.getAttribute("name");
    postCourseCommentStar(order_course_id, starIndex, now);
  }
  function handleStarMouseEnter(e) {
    let starId = e.currentTarget.id;
    let starIndex = starId.split("-").pop();
    setIsStarsClick(starIndex);
    setIsStarsHover(true);
  }
  function handleStarMouseLeave() {
    setIsStarsClick(orderCourse.star);
    setIsStarsHover(false);
  }
  function handleTextChange(e) {
    let newComment = e.target.value;
    setContentInTextarea(newComment);
    let order_course_id = e.currentTarget.getAttribute("name");
    postCourseComment(order_course_id, newComment, now);
  }

  return (
    <>
      <div className="order-comment-box row justify-content-center align-items-center">
        <div className="col-2 pl-0">
          <div className="course-comment-img ">
            <img
              className="object-fit"
              src={`${COURSE_IMG_URL}/${orderCourse.img}`}
              alt=""
            />
          </div>
        </div>
        <div className="order-course-info col-4">
          <div>訂單編號：{orderCourse.order_no}</div>
          <div>課程名稱：{orderCourse.name}</div>
          <div>報名人數：{orderCourse.amount}</div>
          <div>
            報名日期：
            {moment.utc(orderCourse.booking_date).format("YYYY-MM-DD")}
          </div>
          <div>課程金額：{orderCourse.price * orderCourse.amount}</div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-3">我的評價</div>
            <div className="col-8">
              {starMapping[isStarsClick].map((item, i) => {
                return (
                  <>
                    <FontAwesomeIcon
                      key={i}
                      id={`star-${i + 1}`}
                      name={orderCourse.order_course_id}
                      icon={faStar}
                      className={`stars-hover ml-1 ${item} ${
                        isStarsHover && "star-hover"
                      }`}
                      onClick={handleStarClick}
                      onMouseEnter={handleStarMouseEnter}
                      onMouseLeave={handleStarMouseLeave}
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div className="row mt-1 ml-1 course-comment-content">
            <textarea
              name={orderCourse.order_course_id}
              rows="4"
              col="40"
              className="col-8"
              placeholder={contentInTextarea === null && "尚未留下評論..."}
              value={contentInTextarea}
              onChange={handleTextChange}
            ></textarea>
            <div className="col-4 course-comment-buttons">
              <button
                className="course-comment-send-button"
                onClick={() => {
                  Swal.fire("已更新評價，可以到課程頁看到您的評價哦！");
                }}
              >
                送出評價
              </button>
              <button className="course-comment-link-button">
                <Link
                  to={`/course/${courseIdName[orderCourse.name]["eng"]}`}
                  onClick={() => {
                    setShowCourse(orderCourse.name);
                  }}
                >
                  課程詳情
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentInMember;
