import React, { useState } from "react";

function CourseMapSkill() {
  //切換文字or圖片用，先全部設定為文字面
  const [toggleState, setToggleState] = useState({
    warmup: false,
    sTrun: false,
    jTrun: false,
    carving: false,
    ollie: false,
    park: false,
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
        <div className="decoration-skill">
          <img
            className="object-fit"
            src="/assets/img_course/skillMan.png"
            alt=""
          />
        </div>
        <div className="row justify-content-center align-items-center">
          <h5 className="col-1 total-hour-box">總時數6小時</h5>
          <div className="col-10">
            <div className="row">
              {/* 0.5個小時＝2 */}
              <div
                className={`${
                  toggleState["warmup"] && "rotate-effect"
                } col col-7`}
                onClick={clickToChangeToggle}
                id="warmup"
              >
                <div className="front">暖身及基本動作 - 2hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/warmup.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["sTurn"] && "rotate-effect"
                } col col-2`}
                onClick={clickToChangeToggle}
                id="sTurn"
              >
                <div className="front">S轉彎 - 0.5hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/s-Turn.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["jTurn"] && "rotate-effect"
                } col col-2`}
                onClick={clickToChangeToggle}
                id="jTurn"
              >
                <div className="front">J轉彎 - 0.5hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/j-turn.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["carving"] && "rotate-effect"
                } col col-4`}
                onClick={clickToChangeToggle}
                id="carving"
              >
                <div className="front">走刃 - 1hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/carving.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["ollie"] && "rotate-effect"
                } col col-5`}
                onClick={clickToChangeToggle}
                id="ollie"
              >
                <div className="front">豚跳 - 1hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/ollie.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${
                  toggleState["park"] && "rotate-effect"
                } col col-2`}
                onClick={clickToChangeToggle}
                id="park"
              >
                <div className="front">公園 - 0.5hr</div>
                <div className="back">
                  <img
                    className="object-fit"
                    src="/assets/img_course/park.png"
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

export default CourseMapSkill;
