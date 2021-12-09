import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { COURSE_IMG_URL } from "../../../config/url";
import { getAdviceInfo } from "../moduleList";

function Swiper({
  showCourse,
  customerChoose,
  setItemNumber,
  cartPositionState,
  setColorButton,
  setCategoryId,
}) {
  //後端依據 showCourse抓資料回來
  const [selectedAdvice, setSelectedAdvice] = useState(0);
  const [ifArrowUnavailable, setIfArrowUnavailable] = useState({
    left: true,
    right: false,
  });
  const allProducts = useRef();

  const [adviceInfo, setAdviceInfo] = useState(null);
  //後端依據showCourse抓評論回填
  useEffect(() => {
    getAdviceInfo(showCourse, setAdviceInfo);
  }, []);

  if (adviceInfo === null) {
    return <div className="text-center">此課程無推薦裝備</div>;
  }

  //  往左按鈕的點擊事件
  const changePicToL = () => {
    let newIndex = selectedAdvice - 1;
    if (newIndex < 0) {
      return;
    } else {
      if (newIndex === adviceInfo.length - 2) {
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
    if (newIndex >= adviceInfo.length) {
      return;
    } else {
      if (newIndex === 1) {
        //點右鍵把左箭頭顏色改回來
        setIfArrowUnavailable((cur) => {
          return { ...cur, left: !cur["left"] };
        });
      }
      setSelectedAdvice(newIndex);
      let oriTranslateX = allProducts.current.style.transform;
      //用正規表達式把translateX(350px)轉換為350
      let trimVersion = Number(oriTranslateX.replace(/[^-?\d.]/g, ""));
      allProducts.current.style.transform = `translateX(${
        trimVersion - 160
      }px)`;
      //到最後一個的時候右箭頭改樣式--unavailable
      if (newIndex === adviceInfo.length - 1) {
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
            {adviceInfo.map((product, i) => {
              return (
                <ProductCard
                  key={i}
                  product={product}
                  i={i}
                  selectedAdvice={selectedAdvice}
                  customerChoose={customerChoose}
                  setItemNumber={setItemNumber}
                  cartPositionState={cartPositionState}
                  setColorButton={setColorButton}
                  setCategoryId={setCategoryId}
                />
              );
            })}
          </div>
        </div>
        <div className="d-md-flex d-sm-none justify-content-between">
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
