import React from "react";

import { Link } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";

function HomeCourseMore({
  averageRate,
  signupRemainToday,
  href,
  setColorButton,
}) {
  let starDefault = [<BsStar />, <BsStarFill />];
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < averageRate) {
      stars.push(starDefault[1]);
    } else {
      stars.push(starDefault[0]);
    }
  }
  // console.log(stars);
  return (
    <>
      <div className="home-course-star-more">
        <div className="course-right">
          <div className="home-course-reply">
            <div className="home-star">{stars.map((v) => v)}</div>
            <p>
              (<span>{averageRate}</span>/5)
            </p>
          </div>
          {/* home-course-reply end */}
          <div className="home-course-people">
            人數剩餘:<span>{signupRemainToday}</span>人
          </div>
          {/* home-course-people */}
        </div>
        {/* course-right end */}
        <div>
          <Link
            to={`/course/${href}`}
            onClick={() => {
              setColorButton("多元課程");
            }}
          >
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
