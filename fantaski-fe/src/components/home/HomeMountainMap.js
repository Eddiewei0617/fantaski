import React from "react";
import { Link } from "react-router-dom";
import HomeTitle from "./HomeTitle";
import { IMAGE_ROUTER_URL, IMAGE_HOME_URL } from "../../config/url";

function iglooRoute() {
  let popup = document.getElementById("iglooRoute");
  popup.classList.toggle("show");
}

function redRoute() {
  let popup = document.getElementById("redRoute");
  popup.classList.toggle("show");
}

function greenRoute() {
  let popup = document.getElementById("greenRoute");
  popup.classList.toggle("show");
}

function blackRoute() {
  let popup = document.getElementById("blackRoute");
  popup.classList.toggle("show");
}

function HomeMountainMap({ setColorButton }) {
  const mainTitle = {
    title: "雪道地圖",
    subTitle: "有三種不同路線等著你去闖關",
  };

  return (
    <>
      <div className="router-dotted">
        <img
          src={`${IMAGE_HOME_URL}/green_tree.png`}
          alt="white_tree"
          id="routerGT"
        />
        <img
          src={`${IMAGE_HOME_URL}/green_tree.png`}
          alt="white_tree"
          id="routerGT01"
        />
      </div>

      <section className="home-mountain-map home-section">
        <div className="clouds-area">
          <div className="clouds">
            <img
              src={`${IMAGE_HOME_URL}/cloud1.png`}
              alt="clouds"
              style={{ "--i": 1 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud2.png`}
              alt="clouds"
              style={{ "--i": 2 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud3.png`}
              alt="clouds"
              style={{ "--i": 3 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud4.png`}
              alt="clouds"
              style={{ "--i": 4 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud5.png`}
              alt="clouds"
              style={{ "--i": 5 }}
            />
          </div>
          <HomeTitle title={mainTitle.title} subTitle={mainTitle.subTitle} />
          {/* home-title-area end */}
        </div>
        {/* clouds end */}

        <div className="container">
          <div className="home-map">
            <div className="skiMap mt-0">
              <div className="igloo-popup" onClick={iglooRoute}>
                <div className="map-igloo">
                  <img
                    src={`${IMAGE_ROUTER_URL}/igloo.png`}
                    alt="igloooooooooo"
                  />
                </div>

                <div className="igloo-route-popup" id="iglooRoute">
                  <div className="igloo-route-popup-text">
                    <p>
                      雪道分布:
                      <span id="iglooRouteColor">&nbsp;綠線</span>
                    </p>
                    <p>路&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;線:&nbsp;開放</p>
                    <hr id="iglooGreenRoute" />
                    <p>推薦課程:&nbsp;冰屋課程</p>
                  </div>
                  <Link
                    to="/mountainroute"
                    onClick={() => {
                      setColorButton("山的一切");
                    }}
                  >
                    <button type="button" className="home-route-btn">
                      查看更多
                    </button>
                  </Link>
                </div>
              </div>
              {/* igloo-popup end */}

              <div className="red-popup" onClick={redRoute}>
                <svg
                  className="red-route-animation"
                  width="1103"
                  height="845"
                  viewBox="0 0 1103 845"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M562 52C614.167 44.6666 727.2 31.6 762 38C805.5 46 802.5 48 805.5 38C808.5 28 802 28 819.5 24C837 20 896.5 -5.00001 938 9.49999C979.5 24 1087.5 48.5 1095.5 76.5C1103.5 104.5 1082.5 149 1075.5 151C1068.5 153 992 225 1024 285.5C1056 346 1088.5 386.5 1052 391.5C1015.5 396.5 847.5 419 819.5 410C791.5 401 796 392 810.5 369.5C825 347 858 260.5 805.5 216C753 171.5 755.5 160.5 738 170.5C720.5 180.5 683 209.5 678 224.5C673 239.5 655 251 647 254C639 257 635.5 272.5 632.5 279C630.1 284.2 615.167 289.5 608 291.5C598.333 295.667 582.9 304.8 598.5 308C618 312 620.5 316 617 324.5C613.5 333 602 383 612.5 384.5C623 386 632.5 383.5 632.5 379C632.5 374.5 646.5 371.5 649 381.5C651.5 391.5 679 427.5 664 432.5C649 437.5 603.5 452 608 468C612.5 484 627 499.5 603.5 506.5C580 513.5 485 540 475 535.5C467 531.9 443.667 508 433 496.5C427.333 493.167 413.3 488.5 402.5 496.5C391.7 504.5 356.667 499.833 340.5 496.5C333.667 497 317.4 499.7 307 506.5C294 515 210 500.5 199.5 461.5C191.1 430.3 188 397.167 187.5 384.5C185.5 377.833 177.9 367.4 163.5 379"
                    stroke="#F50505"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className="red-route-popup" id="redRoute">
                  <div className="red-route-popup-text">
                    <p>
                      雪道分布:
                      <span id="redRouteColor">&nbsp;紅線</span>
                    </p>
                    <p>路&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;線:&nbsp;開放</p>
                    <hr id="redRoute" />
                    <p>推薦課程:&nbsp;技能課程</p>
                  </div>
                  <Link
                    to="/mountainroute"
                    onClick={() => {
                      setColorButton("山的一切");
                    }}
                  >
                    <button type="button" className="home-route-btn">
                      查看更多
                    </button>
                  </Link>
                </div>
              </div>
              {/* red-popup end */}

              <div className="green-popup" onClick={greenRoute}>
                <svg
                  className="green-route-animation"
                  width="600"
                  height="400"
                  viewBox="0 0 570 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M546 49.5C543.667 45 531.8 36.7 503 39.5C467 43 337 56 326 67.5C315 79 297 81.5 311.5 93C326 104.5 334.5 124.118 334.5 131.5C334.5 143 283 216.5 232 236C181 255.5 106.5 312.5 59 316C21 318.8 7.5 317.167 5.5 316"
                    stroke="#139E13"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className="green-route-popup" id="greenRoute">
                  <div className="green-route-popup-text">
                    <p>
                      雪道分布:
                      <span id="greenRouteColor">&nbsp;綠線</span>
                    </p>
                    <p>路&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;線:&nbsp;開放</p>
                    <hr id="greenRoute" />
                    <p>推薦課程:&nbsp;初級課程</p>
                  </div>

                  <Link
                    to="/mountainroute"
                    onClick={() => {
                      setColorButton("山的一切");
                    }}
                  >
                    <button type="button" className="home-route-btn">
                      查看更多
                    </button>
                  </Link>
                </div>
              </div>
              {/* green-popup end */}

              <div className="black-popup" onClick={blackRoute}>
                <svg
                  className="black-route-animation"
                  width="600"
                  height="870"
                  viewBox="0 0 600 870"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M557 59.5C565.833 84.3333 565.3 144.1 492.5 184.5C401.5 235 350 242 355 279.5C360 317 367.5 354 337 384.5C306.5 415 314.5 443.5 322.5 453.5C330.5 463.5 345.5 472.5 322.5 510C299.5 547.5 294 589.5 329.5 626C365 662.5 397 762 376 784.5C355 807 234 820 189.5 824C153.9 827.2 147.667 835.667 149 839.5"
                    stroke="#000"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className="black-route-popup" id="blackRoute">
                  <div className="black-route-popup-text">
                    <p>
                      雪道分布:
                      <span id="blackRouteColor">&nbsp;黑線</span>
                    </p>
                    <p>路&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;線:&nbsp;開放</p>
                    <hr id="blackRoute" />
                    <p>推薦課程:&nbsp;雪橇課程</p>
                  </div>

                  <Link
                    to="/mountainroute"
                    onClick={() => {
                      setColorButton("山的一切");
                    }}
                  >
                    <button type="button" className="home-route-btn">
                      查看更多
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* skiMap end */}
          </div>
          {/* home-map end */}
        </div>
        {/* container end */}

        <div className="router-dotted">
          <img
            src={`${IMAGE_HOME_URL}/white_tree.png`}
            alt="white_tree"
            id="routerWT01"
          />
        </div>

        <div className="clouds-area">
          <div className="clouds">
            <img
              src={`${IMAGE_HOME_URL}/cloud1.png`}
              alt="clouds"
              style={{ "--i": 1 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud2.png`}
              alt="clouds"
              style={{ "--i": 2 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud3.png`}
              alt="clouds"
              style={{ "--i": 3 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud4.png`}
              alt="clouds"
              style={{ "--i": 4 }}
            />
            <img
              src={`${IMAGE_HOME_URL}/cloud5.png`}
              alt="clouds"
              style={{ "--i": 5 }}
            />
          </div>
        </div>
        {/* clouds-area end */}
      </section>
    </>
  );
}

export default HomeMountainMap;
