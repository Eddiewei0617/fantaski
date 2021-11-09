import React, { useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { COURSE_IMG_URL } from "../../../config/url";

// import pants from "../../img/1631584448.jpg";

const adviceProducts = [
  {
    id: 1,
    name: "高機能雪褲",
    intro: "防雪防滑防寒還能放糖果！安心滑雪首選！",
    price: 3000,
    img: "1631584448.jpg",
  },
  {
    id: 2,
    name: "酷炫雪板",
    intro: "防雪防滑防寒還能放糖果！安心滑雪首選！",
    price: 1000,
    img: "1630913734.jpg",
  },
  {
    id: 3,
    name: "高級雪鞋",
    intro: "防雪防滑防寒還能放糖果！安心滑雪首選！",
    price: 2000,
    img: "1631004818.jpg",
  },
  {
    id: 4,
    name: "最強護目鏡",
    intro: "防雪防滑防寒還能放糖果！安心滑雪首選！",
    price: 2000,
    img: "1630914036.jpg",
  },
];

function Swiper({ showCourse }) {
  //後端依據 showCourse抓資料回來
  const [selectedAdvice, setSelectedAdvice] = useState(0);
  const [ifArrowUnavailable, setIfArrowUnavailable] = useState({
    left: true,
    right: false,
  });
  const allProducts = useRef();

  //  往左按鈕的點擊事件
  const changePicToL = () => {
    let newIndex = selectedAdvice - 1;
    if (newIndex < 0) {
      return;
    } else {
      if (newIndex === adviceProducts.length - 2) {
        //左鍵把右箭頭顏色改回來
        setIfArrowUnavailable((cur) => {
          return { ...cur, right: !cur["right"] };
        });
      }
      setSelectedAdvice(newIndex);
      let oriTranslateX = allProducts.current.style.transform;
      //用正規表達式把translateX(350px)轉換為350
      let trimVersion = Number(oriTranslateX.replace(/[^-?\d.]/g, ""));
      allProducts.current.style.transform = `translateX(${
        trimVersion + 160
      }px)`;
      //到最後一個的時候右箭頭改樣式--unavailable
      if (newIndex === 0) {
        setIfArrowUnavailable((cur) => {
          return { ...cur, left: !cur["left"] };
        });
      }
    }
  };
  //  往右按鈕的點擊事件
  const changePicToR = () => {
    let newIndex = selectedAdvice + 1;
    if (newIndex >= adviceProducts.length) {
      console.log("stopped");
      return;
    } else {
      if (newIndex === 1) {
        //點右鍵把左箭頭顏色改回來
        setIfArrowUnavailable((cur) => {
          return { ...cur, left: !cur["left"] };
        });
      }
      console.log("intoAnimate");
      setSelectedAdvice(newIndex);
      let oriTranslateX = allProducts.current.style.transform;
      //用正規表達式把translateX(350px)轉換為350
      let trimVersion = Number(oriTranslateX.replace(/[^-?\d.]/g, ""));
      allProducts.current.style.transform = `translateX(${
        trimVersion - 160
      }px)`;
      //到最後一個的時候右箭頭改樣式--unavailable
      if (newIndex === adviceProducts.length - 1) {
        setIfArrowUnavailable((cur) => {
          return { ...cur, right: !cur["right"] };
        });
      }
    }
  };

  return (
    <>
      <div className="swiper-wrapper">
        <div className="decoration-skill">
          <img
            className="object-fit"
            src={`${COURSE_IMG_URL}/all-advice.png`}
            alt=""
          />
        </div>
        <div className="visibleBox">
          {/* 這裡開始是產品的卡片串 */}
          <div
            className="all-products d-flex align-items-center"
            style={{ transform: "translateX(160px)" }}
            ref={allProducts}
          >
            {adviceProducts.map((product, i) => {
              return (
                <ProductCard
                  key={i}
                  product={product}
                  i={i}
                  selectedAdvice={selectedAdvice}
                />
              );
            })}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className={`swiper-arrow-box swiper-arrow-left ${
              ifArrowUnavailable["left"] && "swiper-arrow-box-unavailable"
            }`}
            onClick={changePicToL}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={`swiper-arrow-box swiper-arrow-right ${
              ifArrowUnavailable["right"] && "swiper-arrow-box-unavailable"
            }`}
            onClick={changePicToR}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Swiper;
