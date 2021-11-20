import React, { useEffect, useState } from "react";
import { IMAGE_SHARE_URL } from "../../config/url";
import { Link } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { axios } from "axios";
import { getWeatherInfo } from "../course/moduleList";

// icon
import {
  BsFillCartFill,
  BsFillCloudSunFill,
  BsFillBrightnessHighFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudyFill,
  BsSnow2,
  BsWind,
} from "react-icons/bs";
import { FaUserAlt, FaCloudSunRain } from "react-icons/fa";

import $ from "jquery";

function Navbar({ courses, setShowCourse, setItemNumber, itemNumber }) {
  // 設定該項目被點選時的狀態
  const [forumCategory, setForumCategory] = useState({
    forumCategory: 0,
    isHot: true,
  });

  let [colorButton, setColorButton] = useState("FANTASKI");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState();

  const handleClick = (e) => {
    setColorButton(e.target.innerText);
  };
  // console.log(IMAGE_SHARE_URL.slice(0, -1));
  // navbar動態效果
  useEffect(() => {
    $(".change-logo").css("display", "none");
    $(".logo-img").css("display", "inline-block");
    $(window).scroll((evt) => {
      if ($(window).scrollTop() > 0) {
        $(".navbar").removeClass("navbar-top");
        $(".navbar").addClass("bg-white");
        $(".navbar").addClass("navbar-light");
        $(".left-line").addClass("left-line-blue");
        $(".change-logo").css("display", "inline-block");
        $(".logo-img").css("display", "none");
      } else {
        $(".navbar").addClass("navbar-top");
        $(".navbar").removeClass("bg-white");
        $(".navbar").removeClass("navbar-light");
        $(".left-line").removeClass("left-line-blue");
        $(".change-logo").css("display", "none");
        $(".logo-img").css("display", "inline-block");
      }
    });
  }, []);

  // 天氣小圖api;
  useEffect(() => {
    //天氣資訊api--因為免費版有使用次數上限，先把他註解掉
    // getWeatherInfo(setWeatherInfo);
    //用哪個天氣小圖
    decideWeatherIcon();
  }, []);
  // 決定要用哪個天氣小圖
  function decideWeatherIcon() {
    let weatherIconTag;
    if (weatherInfo !== null) {
      let weatherStatusId = weatherInfo.statusId.toString().split("")[0];
      console.log(weatherStatusId);
      switch (Number(weatherStatusId)) {
        case 2:
          weatherIconTag = (
            <BsFillCloudyFill className="all-icon-nav" size={25} />
          );
          break;
        case 3:
          weatherIconTag = (
            <FaCloudSunRain className="all-icon-nav" size={25} />
          );
          break;
        case 5:
          weatherIconTag = (
            <BsFillCloudRainHeavyFill className="all-icon-nav" size={25} />
          );
          break;
        case 6:
          weatherIconTag = <BsSnow2 className="all-icon-nav" size={25} />;
          break;
        case 7:
          weatherIconTag = <BsWind className="all-icon-nav" size={25} />;
          break;
        case 8:
          weatherInfo.statusId === 800
            ? (weatherIconTag = (
                <BsFillBrightnessHighFill className="all-icon-nav" size={25} />
              ))
            : (weatherIconTag = (
                <BsFillCloudSunFill className="all-icon-nav" size={25} />
              ));
          break;
        default:
          <BsFillCloudyFill className="all-icon-nav" size={25} />;
      }
    } else {
      weatherIconTag = <BsFillCloudyFill className="all-icon-nav" size={25} />;
    }
    setWeatherIcon(weatherIconTag);
  }

  return (
    <>
      {/* scroll 初始化 */}
      <ParallaxProvider
        init={{
          smoothScrollingDuration: 1000,
          smoothScrolling: true,
          forceHeight: false,
        }}
        // getScrollTop={(scrollTop) => console.log("scrollTop", scrollTop)}
      >
        <nav className="navbar navbar-expand-lg fixed-top navbar-top">
          <div className="container">
            <div className="navbar-header">
              {/* logo */}
              <Link className="navbar-brand" to="/">
                <img
                  src={`${IMAGE_SHARE_URL}/fantaski_logo_white.svg`}
                  width="70"
                  height="70"
                  alt="FantaskiLogo"
                  className={`logo-img ${
                    colorButton === "FANTASKI" && "active"
                  }`}
                  onClick={handleClick}
                />
                <span
                  className={`change-logo ${
                    colorButton === "FANTASKI" && "active"
                  }`}
                  onClick={handleClick}
                >
                  FANTASKI
                </span>
              </Link>
            </div>
            {/* 主頁面 */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto ml-auto">
                <li className="nav-item mr-3">
                  <Link
                    className={`nav-link ${
                      colorButton === "多元課程" && "active"
                    }`}
                    to="/course/beginner"
                    onClick={(e) => {
                      handleClick(e);
                      setShowCourse(courses[0]);
                    }}
                  >
                    多元課程
                  </Link>
                </li>
                <li className="nav-item  mr-3">
                  <Link
                    className={`nav-link ${
                      colorButton === "山的一切" && "active"
                    }`}
                    to="/mountainroute"
                    onClick={handleClick}
                  >
                    山的一切
                  </Link>
                </li>
                <li className="nav-item  mr-3">
                  <Link
                    className={`nav-link ${
                      colorButton === "租點裝備" && "active"
                    }`}
                    to="/products"
                    onClick={handleClick}
                  >
                    租點裝備
                  </Link>
                </li>
                <li className="nav-item  mr-3">
                  <Link
                    className={`nav-link ${
                      colorButton === "滑雪論壇" && "active"
                    }`}
                    to="/forum"
                    onClick={handleClick}
                  >
                    滑雪論壇
                  </Link>
                </li>
              </ul>
            </div>
            {/* 右側天氣、購物車&會員 */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-3 mr-auto d-flex justify-content-center align-items-center">
                <li className="left-line"></li>
                <li className="nav-item">
                  {/* 天氣小圖有時間在製作 */}
                  <Link
                    className={`nav-link ${colorButton === "天氣" && "active"}`}
                    to="/#"
                    onClick={handleClick}
                  >
                    {weatherIcon}
                    {/* 天氣小圖&溫度要抓天氣API */}
                    {/* <BsFillCloudSunFill className="all-icon-nav" size={25} /> */}
                    {/* <BsSnow2 />
                <FaCloudSunRain />
                <BsWind />
                <BsFillBrightnessHighFill className="all-icon-nav"/>
                {/* <BsFillCloudyFill /> */}
                    {/* <BsFillCloudRainHeavyFill /> */}
                    <span className="warm-number">
                      {weatherInfo !== null ? weatherInfo.temp : "3"}°C
                    </span>
                    <span className="area-time text-center">
                      JP Hokkaido
                      {weatherInfo !== null ? weatherInfo.time : "16:00"}
                    </span>
                  </Link>
                </li>
                <li className="left-line"></li>
                <li className="nav-item">
                  {localStorage["addItemList"] === "" ? (
                    <Link className="nav-link position-relative" to="/products">
                      <BsFillCartFill className="all-icon-nav" size={25} />
                      <p className="shopping-cart-circle" id="itemNumber">
                        {itemNumber}
                      </p>
                    </Link>
                  ) : (
                    <Link className="nav-link position-relative" to="/orders">
                      {" "}
                      <BsFillCartFill className="all-icon-nav" size={25} />
                      <p className="shopping-cart-circle" id="itemNumber">
                        {itemNumber}
                      </p>
                    </Link>
                  )}
                </li>
                <li className="left-line"></li>
                <li className="nav-item user-login">
                  <Link
                    className={`nav-link ${
                      colorButton === "會員中心" && "active"
                    }`}
                    to="/member"
                    onClick={handleClick}
                  >
                    <FaUserAlt className="all-icon-nav" size={25} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      colorButton === "login" && "active"
                    }`}
                    to="/login"
                    onClick={handleClick}
                  >
                    {/* 會員登入後，要將(登入/註冊)改為會員的ID(帳號名稱) */}
                    <span className="login">登入/註冊</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </ParallaxProvider>
    </>
  );
}

export default Navbar;
