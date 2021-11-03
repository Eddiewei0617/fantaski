import React from "react";
import Video from "../../../components/course/video/Video";
import CourseButtons from "../../../components/course/courseButtons/CourseButtons";
import Title from "../../../components/course/titles/Title";
import CourseIntroSkill from "../../../components/course/courseIntroSkill/CourseIntroSkill";
import CourseMapSkill from "../../../components/course/courseMapSkill/CourseMapSkill";

function Skill(props) {
  const { courses, showCourse, setShowCourse } = props;
  return (
    <>
      <Video />
      <CourseButtons
        courses={courses}
        showCourse={showCourse}
        setShowCourse={setShowCourse}
      />
      <Title titleName="課程介紹" />
      <CourseIntroSkill />
      <Title titleName="課程導覽" />
      <CourseMapSkill />
      <Title titleName="專業教練" />
      <Title titleName="雪友點評" />
      <Title titleName="推薦裝備" />
    </>
  );
}

export default Skill;
