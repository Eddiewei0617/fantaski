import React from "react";
import { Link } from "react-router-dom";

function HomeCourseButton(props) {
  return (
    <>
      <Link to="/course/beginner">
        <button type="button" className="home-course-btn">
          瞭解課程內容
        </button>
      </Link>
    </>
  );
}

export default HomeCourseButton;
