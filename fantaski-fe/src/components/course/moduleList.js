import axios from "axios";
import { API_URL } from "../../config/url";
import moment from "moment";

export const courseIdName = {
  初體驗: {
    id: 1,
    eng: "beginner",
  },
  技能班: { id: 2, eng: "skill" },
  雪橇車: { id: 3, eng: "sled" },
  建冰屋: { id: 4, eng: "igloo" },
};

//https://openweathermap.org/weather-conditions 對照表
const weatherID = {
  200: "BsFillCloudyFill", //Thunderstorm
  300: "FaCloudSunRain", //Drizzle
  500: "BsFillCloudRainHeavyFill", //Rain
  600: "BsSnow2", //Snow
  700: "BsWind", //Atmosphere
  800: "BsFillBrightnessHighFill", //Clear
  810: "BsFillCloudSunFill", //Clouds
};

//滾輪到特定高度才出現浮動式的立即報名
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

//會員購買課程api
export async function getMemberCourseComment(memberId, setMemberCourseComment) {
  let res = await axios.post(`${API_URL}/course/getmembercoursecomment`, {
    member_id: memberId,
  });
  let memberCourseComment = res.data;
  setMemberCourseComment(memberCourseComment);
}

//會員更新課程評價api
export async function postCourseCommentStar(OrderCourseId, revisedStar, now) {
  let res = await axios.post(`${API_URL}/course/postcoursecommentstar`, {
    order_course_id: OrderCourseId,
    revised_star: revisedStar,
    now: now,
  });
}
//會員更新課程評論api
export async function postCourseComment(OrderCourseId, newComment, now) {
  let res = await axios.post(`${API_URL}/course/postcoursecomment`, {
    order_course_id: OrderCourseId,
    new_comment: newComment,
    now: now,
  });
}

//取得指定期間每日剩餘名額api
export async function getDailyCourseLeft(
  dateStart,
  dateEnd,
  courseId,
  setDailyCourseLeft,
  setStuLimit
) {
  let res = await axios.post(`${API_URL}/course/getdailycourseleft`, {
    date_start: dateStart,
    date_end: dateEnd,
    course_id: courseId,
  });
  let dailyCourseLeft = res.data;
  let stuLimit = dailyCourseLeft["limit"]["stu_limit"];
  let dailyLeftObj = {};
  let leftArray = dailyCourseLeft["dailyLeft"];
  for (let i = 0; i < leftArray.length; i++) {
    let date = moment.utc(leftArray[i]["booking_date"]).format("YYYY-MM-DD");
    dailyLeftObj[date] = leftArray[i]["totalAmount"];
  }
  if (setDailyCourseLeft !== null) {
    setDailyCourseLeft(dailyLeftObj);
  }
  if (setStuLimit !== null) {
    setStuLimit(stuLimit);
  }
}

//即時天氣api
export async function getWeatherInfo(setWeatherInfo) {
  let res = await axios.get(`${API_URL}/weather`);
  let resWeather = res.data.data;
  setWeatherInfo(resWeather);
}
