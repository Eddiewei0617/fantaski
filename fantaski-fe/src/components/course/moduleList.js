import axios from "axios";
import { API_URL } from "../../config/url";

const courseIdName = {
  初體驗: 1,
  技能班: 2,
  雪橇車: 3,
  建冰屋: 4,
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
