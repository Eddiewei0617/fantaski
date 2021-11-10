import React from "react";
import MapMask from "./MapMask";
import { IMAGE_ROUTER_URL } from "../../config/url";
import { useState } from "react";
const logo = document.querySelectorAll(".routeAnimation path");

// for (let i = 0; i < logo.length; i++) {
//   console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
// }

function Map() {
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
  return (
    <div>
      {/* 地圖及路線 */}
      <section className="skiMap position-relative">
        {/* 彈跳視窗 */}
        {/* {line.map((item) => {
          return ( */}
        {/* 綠色線 */}
        <div
          className={`maskBackground ${greenMapView}`}
          tabindex="-1"
          // key={item.id}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h3 className="modal-title greenLine">
                  {/* {item.color} */}綠線
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
              <div className="modal-body d-flex row">
                <div className="col-6 d-flex row">
                  <div className="imageBoxTop col-12 text-center mb-3">
                    {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                    <img
                      className="shadow-sm bg-white  border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    />
                  </div>
                  <div className="col-6 imageBoxLeft imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                  <div className="col-6 imageBoxRight imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6 text-right">
                      <h6>狀況 :</h6>
                      <h6>推薦課程 :</h6>
                      <h6>推薦裝備 :</h6>
                      <h6>教練 :</h6>
                      <h6>課程人數 :</h6>
                    </div>
                    <div className="col-6">
                      <h6>開放</h6>
                      <h6>滑雪初體驗</h6>
                      <h6>雙版/護目鏡/護臂</h6>
                      <h6>Jessica</h6>
                      <h6>10位</h6>
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
                <button type="button" className="popBtn ">
                  立即報名
                </button>
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
          <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h3
                  className="modal-title redLine {
"
                >
                  {/* {item.color} */}紅線
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
              <div className="modal-body d-flex row">
                <div className="col-6 d-flex row">
                  <div className="imageBoxTop col-12 text-center mb-3">
                    {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                    <img
                      className="shadow-sm bg-white  border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    />
                  </div>
                  <div className="col-6 imageBoxLeft imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                  <div className="col-6 imageBoxRight imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6 text-right">
                      <h6>狀況 :</h6>
                      <h6>推薦課程 :</h6>
                      <h6>推薦裝備 :</h6>
                      <h6>教練 :</h6>
                      <h6>課程人數 :</h6>
                    </div>
                    <div className="col-6">
                      <h6>開放</h6>
                      <h6>滑雪初體驗</h6>
                      <h6>雙版/護目鏡/護臂</h6>
                      <h6>Jessica</h6>
                      <h6>10位</h6>
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
                <button type="button" className="popBtn ">
                  立即報名
                </button>
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
          <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h3 className="modal-title blackLine">
                  {/* {item.color} */}黑線
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
              <div className="modal-body d-flex row">
                <div className="col-6 d-flex row">
                  <div className="imageBoxTop col-12 text-center mb-3">
                    {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                    <img
                      className="shadow-sm bg-white  border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    />
                  </div>
                  <div className="col-6 imageBoxLeft imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                  <div className="col-6 imageBoxRight imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6 text-right">
                      <h6>狀況 :</h6>
                      <h6>推薦課程 :</h6>
                      <h6>推薦裝備 :</h6>
                      <h6>教練 :</h6>
                      <h6>課程人數 :</h6>
                    </div>
                    <div className="col-6">
                      <h6>開放</h6>
                      <h6>滑雪初體驗</h6>
                      <h6>雙版/護目鏡/護臂</h6>
                      <h6>Jessica</h6>
                      <h6>10位</h6>
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
                <button type="button" className="popBtn ">
                  立即報名
                </button>
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
          <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h3 className="modal-title greenline">
                  {/* {item.color} */}冰屋
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
              <div className="modal-body d-flex row">
                <div className="col-6 d-flex row">
                  <div className="imageBoxTop col-12 text-center mb-3">
                    {/* <img
                    className="shadow-sm bg-white rounded"
                    src="assets/pexels-tiffany-bui-2405062.jpg"
                  ></img> */}
                    <img
                      className="shadow-sm bg-white  border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    />
                  </div>
                  <div className="col-6 imageBoxLeft imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                  <div className="col-6 imageBoxRight imageBoxImg">
                    <img
                      className="shadow-sm bg-white border border-dark"
                      src={`${IMAGE_ROUTER_URL}/snow3.jpg`}
                    ></img>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6 text-right">
                      <h6>狀況 :</h6>
                      <h6>推薦課程 :</h6>
                      <h6>推薦裝備 :</h6>
                      <h6>教練 :</h6>
                      <h6>課程人數 :</h6>
                    </div>
                    <div className="col-6">
                      <h6>開放</h6>
                      <h6>滑雪初體驗</h6>
                      <h6>雙版/護目鏡/護臂</h6>
                      <h6>Jessica</h6>
                      <h6>10位</h6>
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
                <button type="button" className="popBtn ">
                  立即報名
                </button>
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
            className="mapIgloo"
            src={`${IMAGE_ROUTER_URL}/igloo.png`}
          />
          <img
            className="mapIgloo mapIglooBg"
            src={`${IMAGE_ROUTER_URL}/igloo.png`}
          />
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
      </section>
    </div>
  );
}

export default Map;
