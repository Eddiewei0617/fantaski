import React, { useState, useEffect } from "react";
import { IMAGE_HOME_URL } from "../../config/url";
import { IMAGE_SHARE_URL } from "../../config/url";

function HomeParallax({ homeOffset }) {
  return (
    <>
      <div className="home-parallax">
        <div className="zoom">
          <img
            src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
            alt="mountain"
            id="img1"
            style={{
              width: 100 + homeOffset * 0.5 + "%",
            }}
          />
          <img
            src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
            alt="mountain"
            id="img2"
            style={{ width: 100 + homeOffset * 0.3 + "%" }}
          />
          ㄋ
          <img
            src={`${IMAGE_SHARE_URL}/fantaski_logo.svg`}
            alt="LOGO"
            id="logoimg"
            style={{ top: `-${5 + homeOffset * 0.3 + "%"}` }}
          />
        </div>

        {/* zoom end */}
      </div>
    </>
  );
}

export default HomeParallax;
