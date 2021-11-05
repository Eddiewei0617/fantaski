import React from "react";

const videosLink = [
  {
    name: "初體驗",
    src: "/assets/video/beginner.mp4",
  },

  {
    name: "技能班",
    src: "/assets/video/skillClass.mp4",
  },

  {
    name: "雪橇車",
    src: "/assets/video/sled.mp4",
  },
  {
    name: "建冰屋",
    src: "/assets/video/igloo.mp4",
  },
];
function Video(props) {
  const { showCourse } = props;
  console.log(showCourse);
  //依據回傳的showCourse決定要放哪個影片
  let videoToPlay = videosLink.filter((item) => {
    return item.name === showCourse;
  });

  return (
    <>
      <div className="video-wrap">
        <video autoPlay muted loop>
          {/* <source src="/assets/video/skillClass.mp4"></source> */}
          <source src={videoToPlay[0].src}></source>
        </video>
      </div>
    </>
  );
}

export default Video;
