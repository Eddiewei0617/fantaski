import React from "react";
import { Link } from "react-router-dom";

import { IMAGE_HOME_URL } from "../../config/url";

function HomeBanner({ setColorButton }) {
  return (
    <>
      {/*  home-section */}
      <section className="home-banner">
        <div className="home-banner-area">
          <div className="container">
            <div className="banner-text">
              <h2>新器材推薦</h2>
              <p>
                最新型酷炫的雪地摩托⾞
                <br />
                搭配<span>⿊線</span>課程 | 裝備出租
              </p>
            </div>

            <div className="home-banner-img">
              <Link
                to="/products"
                onClick={() => {
                  setColorButton("租點裝備");
                }}
              >
                <img src={`${IMAGE_HOME_URL}/sled_car.jpg`} alt="sled_car" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeBanner;
