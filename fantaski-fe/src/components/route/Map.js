import React from "react";
import MapMask from "./MapMask";
import { IMAGE_ROUTER_URL } from "../../config/url";
import { PRODUCTIMAGE_URL } from "../../config/url";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/url";
import { COURSE_NAME, MOUNTAIN_STATUS } from "../../config/StatusShortcut";
import { coachesInfo } from "../course/asCouchDB";
const logo = document.querySelectorAll(".routeAnimation path");

// for (let i = 0; i < logo.length; i++) {
//   console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
// }

function Map({ setColorButton }) {
  // let line = [{ id: 1, color: "紅線", img: "src", 人數: "" }];
  const [greenMapView, setGreenMapView] = useState("modal");
  function mapGreen() {
    if (greenMapView === "modal") {
      setGreenMapView("");
    }
  }
  const [blackMapView, setBlackMapView] = useState("modal");
  function mapBlack() {
    if (blackMapView === "modal") {
      setBlackMapView("");
    }
  }
  const [redMapView, setRedMapView] = useState("modal");
  function mapRed() {
    if (greenMapView === "modal") {
      setRedMapView("");
    }
  }

  const [whiteMapView, setWhiteMapView] = useState("modal");
  function mapWhite() {
    if (whiteMapView === "modal") {
      setWhiteMapView("");
    }
  }
  const [routeImg, setRouteImg] = useState("skiing.jpg");
  const [routeRedImg, setRouteRedImg] = useState("red4.jpg");
  const [routeBlackImg, setRouteBlackImg] = useState("snowmobile2.jpg");
  const [routeWhiteImg, setRouteWhiteImg] = useState("igloo5.jpg");

  const [line, setLine] = useState();
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/routeline/route`, {
      withCredentials: true,
    });
    // if (res) {
    //   for (let i = 0; i < res.length; i++) {
    //     res = moment(res).format("YYYY-MM-DD");
    //   }
    // }
    setLine(res.data);
  }, []);
  console.log(line);

  if (!line) {
    return <></>;
  }

  return (
    <div>
      {/* 地圖及路線 */}
      <section className="skiMap position-relative">
        <div className="container">
          {/* 彈跳視窗 */}
          {/* {line.map((item) => {
          return ( */}
          {/* 綠色線 */}
          <div
            className={`maskBackground ${greenMapView}`}
            tabindex="-1"
            // key={item.id}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered route-modal">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h3 className="modal-title greenLine">
                    {/* {item.color} */}
                    {COURSE_NAME[line[0].difficulty_id]}
                  </h3>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setGreenMapView("modal");
                    }}
                  >
                    &times;
                  </button>
                </div>
                {/* 視窗內部內容 */}
                <div className="modal-body d-flex">
                  <div className="col-7 d-flex row">
                    <div
                      className="imageBoxTop col-12 text-center mb-3"
                      onClick={(e) => {}}
                    >
                      {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                      <img
                        className="shadow-sm bg-white  border border-dark"
                        src={`${IMAGE_ROUTER_URL}/${routeImg}`}
                        alt=""
                      />
                    </div>
                    <div
                      className="col-6 imageBoxLeft imageBoxImg"
                      onClick={() => {
                        setRouteImg("skiing.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${IMAGE_ROUTER_URL}/skiing.jpg`}
                        alt=""
                      ></img>
                    </div>
                    <div
                      className="col-6 imageBoxRight imageBoxImg "
                      onClick={() => {
                        setRouteImg("5781362573_3a6e7f5066_o.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${IMAGE_ROUTER_URL}/5781362573_3a6e7f5066_o.jpg`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div className="col-5 route-modal-text-color">
                    <div className="row">
                      <div className="col-4 text-right">
                        <h6>狀況 :</h6>
                        <h6>推薦課程 :</h6>
                        <h6>推薦裝備 :</h6>
                        <h6>教練 :</h6>
                        <h6>課程人數 :</h6>
                      </div>
                      <div className="col-8">
                        <h6>{MOUNTAIN_STATUS[line[0].valid]}</h6>
                        <h6>{line[0].name}</h6>
                        <h6>單雙版 / 雪杖</h6>
                        <h6>{coachesInfo[0].name}</h6>
                        <h6>{line[0].stu_limit}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
                  <div className="p-4">
                    <Link
                      to="/course/beginner"
                      className="popBtn text-decoration-none p-3"
                      onClick={() => {
                        setColorButton("多元課程");
                      }}
                    >
                      前往報名
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 紅色線 */}
          <div
            className={`maskBackground ${redMapView}`}
            tabindex="-1"
            // key={item.id}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered route-modal ">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h3
                    className="modal-title redLine {
"
                  >
                    {/* {item.color} */}
                    {COURSE_NAME[line[1].difficulty_id]}
                  </h3>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setRedMapView("modal");
                    }}
                  >
                    &times;
                  </button>
                </div>
                {/* 視窗內部內容 */}
                <div className="modal-body d-flex">
                  <div className="col-7 d-flex row">
                    <div className="imageBoxTop col-12 text-center mb-3">
                      {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                      <img
                        className="shadow-sm bg-white  border border-dark"
                        src={`${IMAGE_ROUTER_URL}/${routeRedImg}`}
                        alt=""
                      />
                    </div>
                    <div
                      className="col-6 imageBoxLeft imageBoxImg"
                      onClick={() => {
                        setRouteRedImg("red4.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${IMAGE_ROUTER_URL}/red4.jpg`}
                        alt=""
                      ></img>
                    </div>
                    <div
                      className="col-6 imageBoxRight imageBoxImg"
                      onClick={() => {
                        setRouteRedImg("red3.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${IMAGE_ROUTER_URL}/red3.jpg`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div className="col-5 route-modal-text-color">
                    <div className="row">
                      <div className="col-4 text-right">
                        <h6>狀況 :</h6>
                        <h6>推薦課程 :</h6>
                        <h6>推薦裝備 :</h6>
                        <h6>教練 :</h6>
                        <h6>課程人數 :</h6>
                      </div>
                      <div className="col-8">
                        <h6>{MOUNTAIN_STATUS[line[1].valid]}</h6>
                        <h6>{line[1].name}</h6>
                        <h6>單雙版 / 雪鞋 / 護目鏡</h6>
                        <h6>{coachesInfo[2].name}</h6>
                        <h6>{line[1].stu_limit}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
                  <div className="p-4">
                    <Link
                      to="/course/skill"
                      className="popBtn text-decoration-none p-3"
                      onClick={() => {
                        setColorButton("多元課程");
                      }}
                    >
                      前往報名
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 黑色線 */}
          <div
            className={`maskBackground ${blackMapView}`}
            tabindex="-1"
            // key={item.id}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered route-modal">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h3 className="modal-title blackLine">
                    {/* {item.color} */}
                    {COURSE_NAME[line[2].difficulty_id]}
                  </h3>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setBlackMapView("modal");
                    }}
                  >
                    &times;
                  </button>
                </div>
                {/* 視窗內部內容 */}
                <div className="modal-body d-flex">
                  <div className="col-7 d-flex row">
                    <div className="imageBoxTop col-12 text-center mb-3">
                      {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                      <img
                        className="shadow-sm bg-white  border border-dark"
                        src={`${PRODUCTIMAGE_URL}/${routeBlackImg}`}
                        alt=""
                      />
                    </div>
                    <div
                      className="col-6 imageBoxLeft imageBoxImg"
                      onClick={() => {
                        setRouteBlackImg("snowmobile2.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${PRODUCTIMAGE_URL}/snowmobile2.jpg`}
                        alt=""
                      ></img>
                    </div>
                    <div
                      className="col-6 imageBoxRight imageBoxImg"
                      onClick={() => {
                        setRouteBlackImg("snowmobile9.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark pointer"
                        src={`${PRODUCTIMAGE_URL}/snowmobile9.jpg`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div className="col-5 route-modal-text-color">
                    <div className="row">
                      <div className="col-4 text-right">
                        <h6>狀況 :</h6>
                        <h6>推薦課程 :</h6>
                        <h6>推薦裝備 :</h6>
                        <h6>教練 :</h6>
                        <h6>課程人數 :</h6>
                      </div>
                      <div className="col-8">
                        <h6>{MOUNTAIN_STATUS[line[2].valid]}</h6>
                        <h6>{line[2].name}</h6>
                        <h6>雪地摩托車 / 聖誕老人裝</h6>
                        <h6>{coachesInfo[4].name}</h6>
                        <h6>{line[2].stu_limit}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
                  <div className="p-4">
                    <Link
                      to="/course/sled"
                      className="popBtn text-decoration-none p-3"
                      onClick={() => {
                        setColorButton("多元課程");
                      }}
                    >
                      前往報名
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 雪屋 */}
          <div
            className={`maskBackground ${whiteMapView}`}
            tabindex="-1"
            // key={item.id}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered route-modal ">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h3 className="modal-title greenLine">
                    {/* {item.color} */}
                    {COURSE_NAME[line[4].difficulty_id]}
                  </h3>
                  <button
                    type="button"
                    class="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setWhiteMapView("modal");
                    }}
                  >
                    &times;
                  </button>
                </div>
                {/* 視窗內部內容 */}
                <div className="modal-body d-flex">
                  <div className="col-7 d-flex row">
                    <div className="imageBoxTop col-12 text-center mb-3">
                      {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                      <img
                        className="shadow-sm bg-white  border border-dark"
                        src={`${IMAGE_ROUTER_URL}/${routeWhiteImg}`}
                        alt=""
                      />
                    </div>
                    <div
                      className="col-6 imageBoxLeft imageBoxImg pointer"
                      onClick={() => {
                        setRouteWhiteImg("igloo5.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark"
                        src={`${IMAGE_ROUTER_URL}/igloo5.jpg`}
                        alt=""
                      ></img>
                    </div>
                    <div
                      className="col-6 imageBoxRight imageBoxImg pointer"
                      onClick={() => {
                        setRouteWhiteImg("igloo3.jpg");
                      }}
                    >
                      <img
                        className="shadow-sm bg-white border border-dark"
                        src={`${IMAGE_ROUTER_URL}/igloo3.jpg`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div className="col-5 route-modal-text-color">
                    <div className="row">
                      <div className="col-4 text-right">
                        <h6>狀況 :</h6>
                        <h6>推薦課程 :</h6>
                        <h6>推薦裝備 :</h6>
                        <h6>教練 :</h6>
                        <h6>課程人數 :</h6>
                      </div>
                      <div className="col-8">
                        <h6>{MOUNTAIN_STATUS[line[4].valid]}</h6>
                        <h6>{line[4].name}</h6>
                        <h6>雙板 / 雪鏟</h6>
                        <h6>{coachesInfo[6].name}</h6>
                        <h6>{line[4].stu_limit}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
                  <div className="p-4">
                    <Link
                      to="/course/igloo"
                      className="popBtn text-decoration-none p-3"
                      onClick={() => {
                        setColorButton("多元課程");
                      }}
                    >
                      前往報名
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* );
        })} */}
          <div className="mapIglooBorder">
            <img
              onClick={() => {
                mapWhite();
              }}
              className="mapIgloo mapIglooBg"
              src={`${IMAGE_ROUTER_URL}/igloo.png`}
              alt=""
            />
            {/* <img
            className="mapIgloo mapIglooBg"
            src={`${IMAGE_ROUTER_URL}/igloo.png`}
          /> */}
          </div>
          {/* <MapMask /> */}
          <svg
            className="routeAnimation"
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
              onClick={() => {
                mapRed();
              }}
            />
            <path
              d="M546 49.5C543.667 45 531.8 36.7 503 39.5C467 43 337 56 326 67.5C315 79 297 81.5 311.5 93C326 104.5 334.5 124.118 334.5 131.5C334.5 143 283 216.5 232 236C181 255.5 106.5 312.5 59 316C21 318.8 7.5 317.167 5.5 316"
              stroke="#139E13"
              strokeWidth="10"
              strokeLinecap="round"
              onClick={() => {
                mapGreen();
              }}
            />
            <path
              d="M557 59.5C565.833 84.3333 565.3 144.1 492.5 184.5C401.5 235 350 242 355 279.5C360 317 367.5 354 337 384.5C306.5 415 314.5 443.5 322.5 453.5C330.5 463.5 345.5 472.5 322.5 510C299.5 547.5 294 589.5 329.5 626C365 662.5 397 762 376 784.5C355 807 234 820 189.5 824C153.9 827.2 147.667 835.667 149 839.5"
              stroke="black"
              strokeWidth="10"
              strokeLinecap="round"
              onClick={() => {
                mapBlack();
              }}
            />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Map;
