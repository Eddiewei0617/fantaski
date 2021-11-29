import React from "react";

import { Link } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";

function HomeCourseMore({ star, replyNum, stu_limit, href }) {
  console.log(href);
  return (
    <>
      <div className="home-course-star-more">
        <div className="course-right">
          <div className="home-course-reply">
            <div className="home-star">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStar />
              <BsStar />
            </div>
            <p>
              課程評論<span>{replyNum}</span>則
            </p>
          </div>
          {/* home-course-reply end */}
          <div className="home-course-people">
            人數剩餘:<span>{stu_limit}</span>人
          </div>
          {/* home-course-people */}
        </div>
        {/* course-right end */}
        <div>
          <Link to={`/course/${href}`}>
            <button type="button" className="home-course-btn">
              瞭解課程內容
            </button>
          </Link>
        </div>
      </div>
      {/* home-course-star-more end */}
    </>
  );
}

export default HomeCourseMore;
