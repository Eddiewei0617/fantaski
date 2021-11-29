import React from "react";
import SingleCourseLink from "./SingleCourseLink";

const courseDescription = {
  初體驗: {
    desription: "適合剛接觸滑雪想練習基本功的初學者",
    imgSrc: "couch3.jpeg",
  },
  技能班: {
    desription: "適合已有滑雪基礎想學習更酷炫吸睛技巧老手",
    imgSrc: "skill7.jpeg",
  },
  雪橇車: {
    desription: "適合家庭出遊、想一覽雪山風景的遊客",
    imgSrc: "sled1.jpeg",
  },
  建冰屋: {
    desription: "適合想要與小朋友一同搭建自己冰屋的家庭",
    imgSrc: "igloo3.jpeg",
  },
};

function CourseLink(props) {
  const { courses, setShowCourse } = props; //["初體驗", "技能班", "雪橇車", "建冰屋"];
  return (
    <>
      <div className="courselink-wrapper row justify-content-center align-items-center">
        {courses.map((course, i) => {
          return (
            <>
              <SingleCourseLink
                course={course}
                setShowCourse={setShowCourse}
                courseDescription={courseDescription[course]["desription"]}
                imgSrc={courseDescription[course]["imgSrc"]}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default CourseLink;
