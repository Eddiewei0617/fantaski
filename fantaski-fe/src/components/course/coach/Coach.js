import React, { useState } from "react";
import { filterCouches } from "../asCouchDB";
import { COURSE_IMG_URL } from "../../../config/url";

const styleList = [
  {
    svgPathD:
      "M602.81,60.23H141.5c-19.43,0-35.17,12.94-35.17,28.9v92c0,16,15.74,28.91,35.17,28.91H251.32V331.51c0,16.49,16.26,29.85,36.31,29.85h314c20.05,0,36.3-13.36,36.3-29.85V89.13C638,73.17,622.23,60.23,602.81,60.23Z",
    clickAreaClass: "click-area1",
    avatarClass: "avatar1",
    infoClass: "coach-info1",
    position: "教練",
  },
  {
    svgPathD:
      "M602.81,361.36H141.5c-19.43,0-35.17-12.94-35.17-28.91v-92c0-16,15.74-28.91,35.17-28.91H251.32V90.07c0-16.48,16.26-29.84,36.31-29.84h314c20.05,0,36.3,13.36,36.3,29.84V332.45C638,348.42,622.23,361.36,602.81,361.36Z",
    clickAreaClass: "click-area2",
    avatarClass: "avatar2",
    infoClass: "coach-info2",
    position: "助教",
  },
];

function Coach({ showCourse }) {
  let couchtoShow = filterCouches(showCourse);
  //預設教練為回傳資料的第一個id
  const [selectedCoach, setSelectedCoach] = useState(couchtoShow[0]["id"]);
  return (
    <>
      <div className="coach-wrapper">
        {couchtoShow.map((v, i) => {
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
                  <div className="decoration-skill">
                    {selectedCoach === couchtoShow[0]["id"] ? (
                      <img
                        className="object-fit"
                        src={`${COURSE_IMG_URL}/snowManinCouch.png`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="object-fit"
                        src={`${COURSE_IMG_URL}/snowManinCouch2.png`}
                        alt=""
                      />
                    )}
                  </div>
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
                          d={styleList[i]["svgPathD"]}
                          transform="translate(-106.33 -60.23)"
                        />
                      </g>
                    </g>
                  </svg>
                  <div
                    className={`${styleList[i]["clickAreaClass"]} click-area`}
                    onClick={() => {
                      setSelectedCoach(v.id);
                    }}
                  >
                    <div
                      className={`coach-avatar ${styleList[i]["avatarClass"]}`}
                    >
                      <img
                        className="object-fit"
                        src={`${COURSE_IMG_URL}/${v.imgSrc}`}
                        alt={v.imgAlt}
                      />
                    </div>
                    <div
                      className={`coach-info ${styleList[i]["infoClass"]} ${
                        selectedCoach === v.id ? "" : "coach-info-unselected"
                      }`}
                    >
                      <div>{styleList[i]["position"]}</div>
                      <div>{v.name}</div>
                    </div>
                  </div>
                  <div className="coach-file px-5">
                    <div className="text-center">教練小檔案</div>
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
