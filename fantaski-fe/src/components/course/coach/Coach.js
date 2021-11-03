import React, { useState } from "react";

import "./index.css";

const coachesInfo = [
  {
    id: 1,
    svgPathD:
      "M602.81,60.23H141.5c-19.43,0-35.17,12.94-35.17,28.9v92c0,16,15.74,28.91,35.17,28.91H251.32V331.51c0,16.49,16.26,29.85,36.31,29.85h314c20.05,0,36.3-13.36,36.3-29.85V89.13C638,73.17,622.23,60.23,602.81,60.23Z",
    clickAreaClass: "click-area1",
    avatarClass: "avatar1",
    imgSrc: "assets/img/coach-eddie.png",
    imgAlt: "coach Eddie",
    infoClass: "coach-info1",
    position: "教練",
    name: "Eddie Wei",
    liName: "Eddie",
    liExperience: 15,
    liCertificate: "CSIA LEVEL 3",
    liGoodAt: "豚跳、公園",
    liLanguage: "英文、中文",
    liToSay:
      "我是Phil，在雪上已經1500多天了，邁向第十五個雪季。從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣第一位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
  {
    id: 2,
    svgPathD:
      "M602.81,361.36H141.5c-19.43,0-35.17-12.94-35.17-28.91v-92c0-16,15.74-28.91,35.17-28.91H251.32V90.07c0-16.48,16.26-29.84,36.31-29.84h314c20.05,0,36.3,13.36,36.3,29.84V332.45C638,348.42,622.23,361.36,602.81,361.36Z",
    clickAreaClass: "click-area2",
    avatarClass: "avatar2",
    imgSrc: "assets/img/couch6.jpg",
    imgAlt: "coach Eddie",
    infoClass: "coach-info2",
    position: "助教",
    name: "Jennifer Lopez",
    liName: "Jennifer",
    liExperience: 5,
    liCertificate: "CSIA LEVEL 1",
    liGoodAt: "S型轉彎、走刃",
    liLanguage: "英文、中文",
    liToSay:
      "我是Jennifer，在雪上已經1500多天了，邁向第十五個雪季。從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣第一位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
];

function Coach() {
  const [selectedCoach, setSelectedCoach] = useState(1);
  return (
    <>
      <div className="coach-wrapper">
        {coachesInfo.map((v, i) => {
          return (
            <>
              <div
                className={`${
                  selectedCoach === v.id
                    ? "coach-shadow-selected"
                    : "coach-shadow-unselected"
                } coach-shadow `}
              >
                <div className="coach">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 531.65 301.13"
                  >
                    <g>
                      <g>
                        <path
                          className={`${
                            selectedCoach === v.id
                              ? "coach-box-bg"
                              : "coach-box-bg-unselected"
                          }`}
                          d={v.svgPathD}
                          transform="translate(-106.33 -60.23)"
                        />
                      </g>
                    </g>
                  </svg>
                  <div
                    className={`${v.clickAreaClass} click-area`}
                    onClick={() => {
                      setSelectedCoach(v.id);
                      console.log(v.id);
                    }}
                  >
                    <div className={`avatar ${v.avatarClass}`}>
                      <img
                        className="object-fit"
                        src={v.imgSrc}
                        alt={v.imgAlt}
                      />
                    </div>
                    <div
                      className={`coach-info ${v.infoClass} ${
                        selectedCoach === v.id ? "" : "coach-info-unselected"
                      }`}
                    >
                      <div>{v.position}</div>
                      <div>{v.name}</div>
                    </div>
                  </div>
                  <div className="coach-file px-5">
                    <h6 className="text-center">教練小檔案</h6>
                    <ul className="list-unstyled">
                      <li>教練：{v.liName}</li>
                      <li>資歷：{v.liExperience}年</li>
                      <li>認證：{v.liCertificate}</li>
                      <li>擅長：{v.liGoodAt}</li>
                      <li>語言：{v.liLanguage}</li>
                      <li>
                        教練想說：
                        <br />
                        {v.liToSay}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Coach;
