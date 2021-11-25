import React, { useState } from "react";

import HomeCourseMore from "./homeCourse/HomeCourseMore";
import HomeTitle from "./HomeTitle";
import { IMAGE_HOME_URL } from "../../config/url";
const homeCourseFromServer = [
  {
    id: 1,
    image: `${IMAGE_HOME_URL}/home_course01.jpg`,
    title: "初級課程",
    details: [
      "基本滑雪動作(落葉飄1)",
      "滑雪相關知識",
      "冰屋體驗(適合年齡：8歲以上)",
    ],
    routeCate: "綠線",
    routeColor: "#559360",
    price: 2000,
    replyNum: 30,
    stu_limit: 4,
    href: "beginner",
  },
  {
    id: 2,
    image: `${IMAGE_HOME_URL}/home_course03.jpg`,
    title: "技能課程",
    details: [
      "滑雪進階動作",
      "carving 、 J-turn 、 S-turn、 平地花式 、 Park(箱⼦ 、 管⼦)",
    ],
    routeCate: "紅線",
    routeColor: "#F50505",
    price: 4000,
    replyNum: 10,
    stu_limit: 14,
    href: "skill",
  },
  {
    id: 3,
    image: `${IMAGE_HOME_URL}/home_course02.jpg`,
    title: "體驗課程",
    details: ["聖誕⽼⼈與⿅", "雪地摩托⾞"],
    routeCate: "黑線",
    routeColor: "#000",
    price: 6000,
    replyNum: 20,
    stu_limit: 6,
    href: "sled",
  },
];

function HomeCourse(props) {
  const [indexCourse, setIndexCourse] = useState(homeCourseFromServer);

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

          {/* {courseDetail} */}
          <div className="home-course-area">
            {indexCourse.map((v, i) => {
              return (
                <>
                  <div className="home-course-bg" key={v.i}>
                    <div className="home-course-img">
                      <img src={v.image} alt="home_course01" />
                    </div>
                    {/* home-course-img end */}
                    <div className="home-course-name">
                      <h3>{v.title}</h3>
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
                        replyNum={v.replyNum}
                        stu_limit={v.stu_limit}
                        href={v.href}
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
