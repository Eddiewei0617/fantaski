import axios from "axios";
import { API_URL } from "../../config/url";

export const courseIdName = {
  初體驗: {
    id: 1,
    eng: "beginner",
  },
  技能班: { id: 2, eng: "skill" },
  雪橇車: { id: 3, eng: "sled" },
  建冰屋: { id: 4, eng: "igloo" },
};

export function toShowAddCartFloat(setScrollTop) {
  window.addEventListener("scroll", () => {
    let heightToTriggerFloat = 450;
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > heightToTriggerFloat) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  });
}

export const starMapping = {
  0: ["empty-star", "empty-star", "empty-star", "empty-star", "empty-star"],
  1: ["full-star", "empty-star", "empty-star", "empty-star", "empty-star"],
  2: ["full-star", "full-star", "empty-star", "empty-star", "empty-star"],
  3: ["full-star", "full-star", "full-star", "empty-star", "empty-star"],
  4: ["full-star", "full-star", "full-star", "full-star", "empty-star"],
  5: ["full-star", "full-star", "full-star", "full-star", "full-star"],
};

//課程資訊api
export async function getCourseInfo(showCourse, setCourseInfo) {
  let res = await axios.get(`${API_URL}/course/courseinfolist`);
  let courseInfoList = res.data;
  //依據回傳的showCourse return相應資訊
  let infoToSHow = courseInfoList.filter((item) => {
    return item.name === showCourse;
  });
  setCourseInfo(infoToSHow);
}

//課程評論資訊api
export async function getCommentsInfo(showCourse, setCommentsInfo) {
  let res = await axios.post(`${API_URL}/course/getcommentsinfo`, {
    course_id: courseIdName[showCourse].id,
  });
  let commentsInfoList = res.data;
  setCommentsInfo(commentsInfoList);
}

// 課程建議裝備資訊api
export async function getAdviceInfo(showCourse, setAdviceInfo) {
  let res = await axios.post(`${API_URL}/course/getadviceinfo`, {
    course_id: courseIdName[showCourse].id,
  });
  let adviceInfoList = res.data;
  setAdviceInfo(adviceInfoList);
}
