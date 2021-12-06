import React, { useState } from "react";
import { COURSE_IMG_URL } from "../../../config/url";

function CourseMapIgloo() {
  //切換文字or圖片用，先全部設定為文字面
  const [toggleState, setToggleState] = useState({
    warmup: false,
    sTrun: false,
    jTrun: false,
  });
  //點擊後切換目標id的狀態false <-> true
  const clickToChangeToggle = (e) => {
    let targetId = e.currentTarget.id;
    let oppositeState = !toggleState[targetId];
    let newState = { ...toggleState, [targetId]: oppositeState };
    setToggleState(newState);
    console.log(newState);
    // setToggleState(!toggleState);
  };
  return (
    <>
      <div className="course-map-wrapper">
        <div className="decoration-skill-igloo">
          <img
            className="object-fit"
            src={`${COURSE_IMG_URL}/igloo12.png`}
            alt=""
          />
        </div>
        <div className="row justify-content-center align-items-center">
          <h6 className="col-md-1 total-hour-box three-hour-box">
            總時數3小時
          </h6>
          <div className="col-md-10">
            <div className="row">
              {/* 0.5個小時＝2 */}
              <div
                className={`${
                  toggleState["warmup"] && "rotate-effect"
                } col col-3`}
                onClick={clickToChangeToggle}
                id="warmup"
              >
                <div className="front">場地佔領 - 0.5hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src={`${COURSE_IMG_URL}/warmup.png`}
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["sTurn"] && "rotate-effect"
                } col col-3`}
                onClick={clickToChangeToggle}
                id="sTurn"
              >
                <div className="front">冰屋介紹 - 0.5hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src={`${COURSE_IMG_URL}/igloo2.jpeg`}
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["jTurn"] && "rotate-effect"
                } col col-5`}
                onClick={clickToChangeToggle}
                id="jTurn"
              >
                <div className="front">冰屋建蓋 - 2hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src={`${COURSE_IMG_URL}/igloo10.jpeg`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseMapIgloo;
