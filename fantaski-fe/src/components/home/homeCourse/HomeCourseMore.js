import React from "react";

import HomeCourseButton from "./HomeCourseButton";
import HomeCoursePeople from "./HomeCoursePeople";
import HomeCourseReply from "./HomeCourseReply";

function HomeCourseMore() {
  return (
    <>
      <div className="home-course-star-more">
        <div className="course-right">
          <HomeCourseReply />
          <HomeCoursePeople />
        </div>
        {/* course-right end */}
        <HomeCourseButton />
      </div>
      {/* home-course-star-more end */}
    </>
  );
}

export default HomeCourseMore;
