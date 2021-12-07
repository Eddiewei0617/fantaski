import React, { useEffect } from "react";
import { IMAGE_HOME_URL } from "../../config/url";

import AOS from "aos";
import "aos/dist/aos.css";

function HomeTitle(props) {
  useEffect(() => {
    AOS.init({
      // duration: 2000,
    });
  }, []);
  return (
    <>
      <div
        className="home-title-area"
        data-aos={"zoom-in-up"}
        data-aos-delay={"1000"}
        data-aos-easing={"linear"}
      >
        <img
          src={`${IMAGE_HOME_URL}/flag.svg`}
          alt="flag"
          className="title-flag"
        />
        <div className="home-title">
          <h2>{props.title}</h2>
          <p>{props.subTitle}</p>
        </div>
      </div>
    </>
  );
}

export default HomeTitle;
