import React from "react";
import { Link } from "react-router-dom";
import { COURSE_IMG_URL } from "../../../config/url";

const coursesinEng = {
  初體驗: "beginner",
  技能班: "skill",
  雪橇車: "sled",
  建冰屋: "igloo",
};
function CourseButtons(props) {
  const { courses, showCourse, setShowCourse } = props;
  return (
    <>
      <div className="buttons d-flex justify-content-center align-items-center">
        {courses.map((course, i) => {
          return (
            <>
              <a
                href="#/"
                key={i}
                className={`course${i}`}
                onClick={() => {
                  setShowCourse(course);
                }}
              >
                <Link to={`/course/${coursesinEng[course]}`}>
                  <img
                    src={`${COURSE_IMG_URL}/snowflat.png`}
                    alt=""
                    className={`${showCourse === course && "showCourseBtn"}`}
                  />
                  <span>{course}</span>
                </Link>
              </a>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CourseButtons;
