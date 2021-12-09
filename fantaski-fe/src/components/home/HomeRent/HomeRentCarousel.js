import React, { useState, useEffect } from "react";

import { PRODUCTIMAGE_URL } from "../../../config/url";
import Swiper, { Autoplay } from "swiper";
import { Link } from "react-router-dom";

// const homeRentFromServer = [
//   {
//     id: 1,
//     image: `${PRODUCTIMAGE_URL}/allblack.jfif`,
//     title: "暗黑滿點單板",
//     price: 1200,
//   },
//   {
//     id: 2,
//     image: `${PRODUCTIMAGE_URL}/santaDeer5.jpg`,
//     title: "肌腸鹿鹿",
//     price: 2800,
//   },
//   {
//     id: 3,
//     image: `${PRODUCTIMAGE_URL}/kz_color.png`,
//     title: "筆刷滿點單板",
//     price: 1800,
//   },
//   {
//     id: 4,
//     image: `${PRODUCTIMAGE_URL}/beanies2.jpg`,
//     title: "極保暖毛帽",
//     price: 1000,
//   },
//   {
//     id: 5,
//     image: `${PRODUCTIMAGE_URL}/pants1.jpg`,
//     title: "軍綠94褲",
//     price: 2000,
//   },
//   {
//     id: 6,
//     image: `${PRODUCTIMAGE_URL}/goggle1.jpg`,
//     title: "抗紫外光護目鏡",
//     price: 1000,
//   },
// ];

function HomeRentCarousel({ active, productList, setColorButton }) {
  // console.log(active);

  const [mySwiper, setMySwiper] = useState(null);
  useEffect(() => {
    let swiper = new Swiper(".home-swiper-container", {
      // initialSlide: active > 0 ? active + 1 : 0,
      observer: true, //修改swiper自己或子元素時，自動初始化swiper
      observeParents: true, //修改swiper的父元素時，自動初始化swiper
      direction: "horizontal", // 方向
      loop: false, // 循環
      spaceBetween: 100,
      slidesPerView: 3,
      centeredSlides: true,
      // roundLengths: true,
      // loopAdditionalSlides: 30,
      // grabCursor: true, // 游標為手掌
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });
    setMySwiper(mySwiper);
  }, []);

  // 自動輪播
  Swiper.use([Autoplay]);

  // console.log(productList.filter((e) => e.type === types[1]));

  return (
    <>
      <div className="home-swiper-container">
        <div className="swiper-wrapper home-swiper">
          {productList.map((v, i) => {
            return (
              <>
                <div className="swiper-slide">
                  <Link
                    to="/products"
                    onClick={() => {
                      setColorButton("租點裝備");
                    }}
                  >
                    <div className="home-swiper-area" key={v.i}>
                      <img src={`${PRODUCTIMAGE_URL}/${v.image}`} alt="" />
                      <div className="home-slider-text">
                        <h3>{v.title}</h3>
                        <p>${v.price}</p>
                      </div>
                    </div>
                  </Link>
                  {/* home-swiper-area end */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeRentCarousel;
