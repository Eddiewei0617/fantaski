import React, { useState, useEffect } from "react";
import HomeCourse from "../components/home/HomeCourse";
import HomeCourseShare from "../components/home/HomeCourseShare";
import HomeMountainMap from "../components/home/HomeMountainMap";
import HomeBanner from "../components/home/HomeBanner";
import HomeRent from "../components/home/HomeRent";
import HomeForum from "../components/home/HomeForum";

import HomeParallax from "../components/home/HomeParallax";

import { IMAGE_HOME_URL } from "../config/url";

import AOS from "aos";
import "aos/dist/aos.css";

function Home({ setColorButton }) {
  const [homeOffset, setHomeOffset] = useState(0);
  const handleScroll = () => {
    setHomeOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      // duration: 2000,
    });
  }, []);
  return (
    <>
      <main className="home-main">
        <HomeParallax homeOffset={homeOffset} />
        <div className="cable-car-dotted position-absolute">
          <img
            src={`${IMAGE_HOME_URL}/course_cable_car_dotted.png`}
            alt="cable_car_dotted"
            data-aos={"fade-down"}
            data-aos-duration={"1000"}
            data-aos-easing={"linear"}
          />
        </div>
        <HomeCourse setColorButton={setColorButton} />
        <HomeCourseShare />
        <section className="home-mountain-dot">
          <div
            className="courseShare-imgDotted"
            data-aos={"fade-down"}
            data-aos-duration={"1000"}
            // data-aos-delay={"100"}
          >
            <img
              src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
              alt="mountain"
              id="courseShareImg1"
            />
          </div>
          <div
            className="courseShare-imgDotted mountain-img"
            data-aos={"fade-up"}
            data-aos-delay={"200"}
            data-aos-duration={"1000"}
          >
            <img
              src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
              alt="mountain"
              id="courseShareImg2"
            />
          </div>
          <div className="courseShare-imgDotted" data-aos={"fade-down"}>
            <img
              src={`${IMAGE_HOME_URL}/white_tree.png`}
              alt="white_tree"
              id="routeWt"
            />
          </div>
        </section>
        <HomeMountainMap setColorButton={setColorButton} />
        <HomeBanner setColorButton={setColorButton} />
        <div className="two-bg">
          <HomeRent setColorButton={setColorButton} />
          <HomeForum setColorButton={setColorButton} homeOffset={homeOffset} />

          <div className="monster-area">
            <div
              data-aos={"fade-down"}
              data-aos-delay={"1000"}
              data-aos-duration={"3000"}
            >
              <div className="cirlce-dialog-box">
                <img
                  src={`${IMAGE_HOME_URL}/dialog-box.png`}
                  alt="dialog-box"
                  id="circle01"
                />
              </div>
              <div className="cirlce-dialog-box">
                <img
                  src={`${IMAGE_HOME_URL}/dialog-box.png`}
                  alt="dialog-box"
                  id="circle02"
                />
              </div>
            </div>
            <div className="snow-area">
              <div
                className="monster"
                data-aos={"fade-up"}
                data-aos-easing={"linear"}
                data-aos-delay={"800"}
                // data-aos-duration={"1500"}
              >
                <img src={`${IMAGE_HOME_URL}/monster.png`} alt="monster" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
