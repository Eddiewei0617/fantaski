import React from "react";
import { Link } from "react-router-dom";

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

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img
              src="/assets/image_share/fantaski_logo_white.svg"
              width="70"
              height="70"
              alt="FantaskiLogo"
            />
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav mr-auto ml-auto">
            <li className="nav-item active mr-5">
              <Link className="nav-link" to="/course">
                多元課程
              </Link>
            </li>
            <li className="nav-item  mr-5">
              <Link className="nav-link" to="/mountain">
                山的一切
              </Link>
            </li>
            <li className="nav-item  mr-5">
              <Link className="nav-link" to="/product">
                租點裝備
              </Link>
            </li>
            <li className="nav-item  mr-5">
              <Link className="nav-link" to="/forum">
                滑雪論壇
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-3 mr-auto d-flex justify-content-center align-items-center">
            <li className="left-line"></li>
            <li className="nav-item">
              <Link className="nav-link" to="#/">
                {/* 天氣小圖&溫度要抓天氣API */}
                <BsFillCloudSunFill className="all-icon-nav" size={25} />
                {/* <BsSnow2 />
                <FaCloudSunRain />
                <BsWind />
                <BsFillBrightnessHighFill />
                <BsFillCloudyFill />
                <BsFillCloudRainHeavyFill /> */}
                <span className="warm-number">3°C</span>
                <span className="area-time text-center">JP Hokkaido 11:00</span>
              </Link>
            </li>
            <li className="left-line"></li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/order">
                <BsFillCartFill className="all-icon-nav" size={25} />
                <p className="shopping-cart-circle">10</p>
              </Link>
            </li>
            <li className="left-line"></li>
            <li className="nav-item user-login">
              <Link className="nav-link" to="/login">
                <FaUserAlt className="all-icon-nav" size={25} />
                <span className="login">登入/註冊</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
