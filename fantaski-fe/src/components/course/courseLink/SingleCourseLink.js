import React from "react";
import { Link } from "react-router-dom";
import { COURSE_IMG_URL } from "../../../config/url";

const coursesinEng = {
  初體驗: "beginner",
  技能班: "skill",
  雪橇車: "sled",
  建冰屋: "igloo",
};

function SingleCourseLink(props) {
  const { course, courseDescription, imgSrc, setShowCourse } = props;
  return (
    <>
      <div className="single-course-wrap col-md-5 p-0 m-md-1 m-sm-0">
        <Link
          to={`/course/${coursesinEng[course]}`}
          onClick={() => {
            setShowCourse(course);
          }}
        >
          <div className="single-course-mask">
            <div className="single-course-box">
              <div className="single-course-name">{course}課程</div>
              <div className="single-course-description">
                {courseDescription}
              </div>
            </div>
          </div>
          <img
            className="object-fit"
            src={`${COURSE_IMG_URL}/${imgSrc}`}
            alt=""
          ></img>
        </Link>
      </div>
    </>
  );
}

export default SingleCourseLink;
