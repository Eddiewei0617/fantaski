import React from "react";
import { COURSE_IMG_URL } from "../../../config/url";

const videosLink = [
  {
    name: "初體驗",
    src: "beginner.mp4",
  },

  {
    name: "技能班",
    src: "skillvideo2.mp4",
  },

  {
    name: "雪橇車",
    src: "sledVideo.mp4",
  },
  {
    name: "建冰屋",
    src: "igloo.mp4",
  },
];
function Video(props) {
  const { showCourse } = props;
  //依據回傳的showCourse決定要放哪個影片
  let videoToPlay = videosLink.filter((item) => {
    return item.name === showCourse;
  });

  return (
    <>
      <div className="video-wrap">
        <video autoPlay muted loop>
          {/* <source src="/assets/video/skillClass.mp4"></source> */}
          <source
            src={`${COURSE_IMG_URL}/video/${videoToPlay[0].src}`}
          ></source>
        </video>
      </div>
    </>
  );
}

export default Video;
