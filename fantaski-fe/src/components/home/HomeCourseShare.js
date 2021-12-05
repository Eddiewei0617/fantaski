import React from "react";

import HomeSharePost from "./homeShare/HomeSharePost";

function HomeCourseShare() {
  return (
    <>
      <section className="home-course-share home-section">
        <div className="container">
          <div className="home-share-title">
            <h2>FANTA SKI 學員分享說</h2>
            <hr />
          </div>
          {/* home-share-title end */}
          <HomeSharePost />
        </div>
        {/* container end */}
      </section>
    </>
  );
}

export default HomeCourseShare;
