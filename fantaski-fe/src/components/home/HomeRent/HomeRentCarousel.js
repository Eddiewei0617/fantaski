import React, { useState, useEffect } from "react";

import { PRODUCTIMAGE_URL } from "../../../config/url";
import $ from "jquery";
import Swiper from "swiper";

function HomeRentCarousel() {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      direction: "horizontal", // 方向
      loop: true, // 循環
      spaceBetween: 1,
      slidesPerView: 3,
      centeredSlides: true,
      roundLengths: true,
      loopAdditionalSlides: 30,
      grabCursor: true, // 游標為手掌
      // pagination: {
      //   el: ".swiper-pagination",
      //   dynamicBullets: true,
      // },
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },
    });
  }, []);
  return (
    <>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
          <div className="swiper-slide">Slide 4</div>
          <div className="swiper-slide">Slide 5</div>
        </div>
        {/* <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </div>
      {/* <div className="home-slider-container">
        <div className="home-slider-card">
          <div className="home-slider-img">
            <img src={`${PRODUCTIMAGE_URL}/china_water.jfif`} alt="" />
          </div>
          <div className="home-slider-text">
            <h3>滑雪板</h3>
            <p>$2000</p>
          </div>
        </div>

        <div className="home-slider-card">
          <div className="home-slider-img">
            <img src={`${PRODUCTIMAGE_URL}/santa3.jpg`} alt="" />
          </div>
          <div className="home-slider-text">
            <h3>滑雪板</h3>
            <p>$2000</p>
          </div>
        </div>

        <div className="home-slider-card">
          <div className="home-slider-img">
            <img src={`${PRODUCTIMAGE_URL}/santaDeer5.jpg`} alt="" />
          </div>
          <div className="home-slider-text">
            <h3>滑雪板</h3>
            <p>$2000</p>
          </div>
        </div> */}

      {/* home-slider-card end */}
      {/* </div> */}
    </>
  );
}

export default HomeRentCarousel;
