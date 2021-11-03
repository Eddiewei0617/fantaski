import React from "react";

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
                <img
                  src="/assets/img/snowflat.png"
                  alt=""
                  className={`${showCourse === course && "showCourseBtn"}`}
                />
                <span>{course}</span>
              </a>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CourseButtons;
