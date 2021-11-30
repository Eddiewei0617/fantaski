import React, { useState } from "react";
import { IMAGE_HOME_URL } from "../../config/url";
import { IMAGE_SHARE_URL } from "../../config/url";

function HomeParallax() {
  const [homeOffset, setHomeOffset] = useState();
  const handleScroll = () => {
    setHomeOffset(window.pageYOffset);
  };
  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <div className="home-parallax">
        <div className="zoom">
          <img
            src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
            alt="mountain"
            id="img1"
            style={{
              width: 100 + homeOffset * 0.3 + "%",
            }}
          />
          <img
            src={`${IMAGE_HOME_URL}/home_mountain_01.png`}
            alt="mountain"
            id="img2"
            style={{ width: 100 + homeOffset * 0.3 + "%" }}
          />
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
