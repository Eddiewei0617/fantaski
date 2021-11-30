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
      <div className="course-buttons d-flex justify-content-center align-items-center">
        {courses.map((course, i) => {
          return (
            <>
              <Link
                key={i}
                to={`/course/${coursesinEng[course]}`}
                className={`course${i}`}
                onClick={() => {
                  setShowCourse(course);
                }}
              >
                <img
                  src={`${COURSE_IMG_URL}/snowflat.png`}
                  alt=""
                  className={`${showCourse === course && "showCourseBtn"}`}
                />
                <span>{course}</span>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CourseButtons;
