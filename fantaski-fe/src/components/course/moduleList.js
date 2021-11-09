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

export const starMapping = {
  0: ["empty-star", "empty-star", "empty-star", "empty-star", "empty-star"],
  1: ["full-star", "empty-star", "empty-star", "empty-star", "empty-star"],
  2: ["full-star", "full-star", "empty-star", "empty-star", "empty-star"],
  3: ["full-star", "full-star", "full-star", "empty-star", "empty-star"],
  4: ["full-star", "full-star", "full-star", "full-star", "empty-star"],
  5: ["full-star", "full-star", "full-star", "full-star", "full-star"],
};

export async function getCourseInfo(showCourse, setCourseInfo) {
  let res = await axios.get(`http://localhost:3001/api/course/courseInfoList`);
  let courseInfoList = res.data;
  //依據回傳的showCourse return相應資訊
  let infoToSHow = courseInfoList.filter((item) => {
    return item.name === showCourse;
  });
  console.log(infoToSHow);
  setCourseInfo(infoToSHow);
}
