import React, { useState, useEffect } from "react";
import Video from "../../components/course/video/Video";
import CourseButtons from "../../components/course/courseButtons/CourseButtons";
import Title from "../../components/course/titles/Title";
import CourseIntroSkill from "../../components/course/courseIntro/CourseIntroSkill";
import CourseMapIgloo from "../../components/course/courseMap/CourseMapIgloo";
import Coach from "../../components/course/coach/Coach";
import Comments from "../../components/course/comments/Comments";
import AddCartFix from "../../components/course/addCartFix/AddCartFix";
import Swiper from "../../components/course/swiper/Swiper";
import CourseLink from "../../components/course/courseLink/CourseLink";
import AddCartFloat from "../../components/course/addCartFloat/AddCartFloat";
import { toShowAddCartFloat } from "../../components/course/moduleList";

function Skill(props) {
  const {
    courses,
    showCourse,
    setShowCourse,
    setItemNumber,
    cartPositionState,
    setColorButton,
    setCategoryId,
    userInfo,
  } = props;
  //courses ["初體驗", "技能班", "雪橇車", "建冰屋"]
  //showCourse courses[1]
  const [customerChoose, setCustomerChoose] = useState({
    date: "",
    number: 1,
  });
  const [scrollTop, setScrollTop] = useState(false);
  const [ifAddCart, setIfAddCart] = useState(false);

  useEffect(() => {
    toShowAddCartFloat(setScrollTop);
    setShowCourse(courses[3]);
  }, []);

  if (showCourse === undefined) {
    setShowCourse(courses[3]);
    return <div></div>;
  }

  return (
    <>
      <Video showCourse={showCourse} />
      {scrollTop && (
        <AddCartFloat
          ifAddCart={ifAddCart}
          setIfAddCart={setIfAddCart}
          className="animate__animated animate__backInRight "
          showCourse={showCourse}
          customerChoose={customerChoose}
          setCustomerChoose={setCustomerChoose}
          setItemNumber={setItemNumber}
          userInfo={userInfo}
        />
      )}

      <CourseButtons
        courses={courses}
        showCourse={showCourse}
        setShowCourse={setShowCourse}
      />
      <Title titleName="課程介紹" />
      <CourseIntroSkill />
      <Title titleName="課程導覽" />
      <CourseMapIgloo />
      <Title titleName="專業教練" />
      <Coach showCourse={showCourse} />
      <Title titleName="雪友點評" />
      <Comments showCourse={showCourse} />
      <AddCartFix
        ifAddCart={ifAddCart}
        setIfAddCart={setIfAddCart}
        showCourse={showCourse}
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        setItemNumber={setItemNumber}
        cartPositionState={cartPositionState}
        userInfo={userInfo}
      />
      <Title titleName="推薦裝備" />
      <Swiper
        showCourse={showCourse}
        customerChoose={customerChoose}
        setItemNumber={setItemNumber}
        setColorButton={setColorButton}
        setCategoryId={setCategoryId}
      />
      <Title titleName="其他課程" />
      <CourseLink setShowCourse={setShowCourse} courses={courses} />
    </>
  );
}

export default Skill;
