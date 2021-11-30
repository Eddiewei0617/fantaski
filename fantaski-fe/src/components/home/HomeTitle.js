import React from "react";
import { IMAGE_HOME_URL } from "../../config/url";

function HomeTitle(props) {
  return (
    <>
      <div className="home-title-area">
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
