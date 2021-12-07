import React, { useEffect, useState } from "react";

import HomeCourseMore from "./homeCourse/HomeCourseMore";
import HomeTitle from "./HomeTitle";
import { IMAGE_HOME_URL } from "../../config/url";

import { HomeCourseList } from "./asCoruseDB";

import axios from "axios";
import { API_URL } from "../../config/url";

function HomeCourse({ setColorButton }) {
  // 接後端資料顯示於頁面上
  const [indexCourseDetail, setIndexCourseDetail] = useState([]);
  const [indexCourseList, setIndexCoureList] = useState(HomeCourseList);

  useEffect(async () => {
    let res = await axios.get(`${API_URL}/home/idxcoursepricerateremain`);
    setIndexCourseDetail(res.data);
    for (let i = 0; i < res.data.length; i++) {
      indexCourseList[i]["name"] = res.data[i]["name"];
      indexCourseList[i]["price"] = res.data[i]["price"];
      indexCourseList[i]["averageRate"] = res.data[i]["averageRate"];
      indexCourseList[i]["signupRemainToday"] =
        res.data[i]["signupRemainToday"];
    }
  }, []);

  const mainTitle = {
    title: "多元課程",
    subTitle: "有專屬教練及體驗當愛斯基摩⼈",
  };

  return (
    <>
      <section className="home-course home-section">
        <div className="container">
          <HomeTitle title={mainTitle.title} subTitle={mainTitle.subTitle} />
          {/* home-title-area end */}

          <div className="course-dotted" data-aos={"fade-left"}>
            <img
              src={`${IMAGE_HOME_URL}/white_tree.png`}
              alt="white_tree"
              id="courseWT"
            />
          </div>
          <div
            className="course-dotted"
            data-aos={"fade-up-left"}
            data-aos-easing={"linear"}
            data-aos-duration={"1500"}
          >
            <img
              src={`${IMAGE_HOME_URL}/green_tree.png`}
              alt="green_tree"
              id="courseGT"
            />
            <img
              src={`${IMAGE_HOME_URL}/green_tree.png`}
              alt="green_tree"
              id="courseGTL"
            />
          </div>

          {/* {courseDetail} */}
          <div className="home-course-area">
            {indexCourseList.map((v, i) => {
              return (
                <>
                  <div className="home-course-bg" key={v.i}>
                    <div className="home-course-img">
                      <img src={v.image} alt="home_course01" />
                    </div>
                    {/* home-course-img end */}
                    <div className="home-course-name">
                      <h3>{v.name}</h3>
                    </div>
                    <div className="home-course-detail-area">
                      <div className="home-course-list">
                        {v.details.map((value) => {
                          return <li key={v}>{value}</li>;
                        })}
                      </div>
                      {/* home-course-list end */}
                      <div className="home-area-price">
                        <p>
                          雪道分佈:
                          <span style={{ color: v.routeColor }}>
                            {v.routeCate}
                          </span>
                        </p>
                        <p className="home-course-price">${v.price}</p>
                      </div>
                      {/* home-area-price end */}
                      <hr />
                      <HomeCourseMore
                        averageRate={v.averageRate}
                        signupRemainToday={v.signupRemainToday}
                        href={v.href}
                        setColorButton={setColorButton}
                      />
                    </div>
                    {/* home-course-detail-area end */}
                  </div>
                  {/* home-course-bg end */}
                </>
              );
            })}
          </div>
          {/* home-course-area end */}
        </div>
      </section>
    </>
  );
}

export default HomeCourse;
