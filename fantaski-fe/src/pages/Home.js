import React from "react";
import HomeCourse from "../components/home/HomeCourse";
import HomeCourseShare from "../components/home/HomeCourseShare";
import HomeMountainMap from "../components/home/HomeMountainMap";
import HomeBanner from "../components/home/HomeBanner";
import HomeRent from "../components/home/HomeRent";
import HomeForum from "../components/home/HomeForum";

import HomeParallax from "../components/home/HomeParallax";

function Home() {
  return (
    <>
      <main className="home-main">
        <HomeParallax />

        <HomeCourse />
        <HomeCourseShare />
        <HomeMountainMap />
        <HomeBanner />
        <HomeRent />
        <HomeForum />
      </main>
    </>
  );
}

export default Home;
