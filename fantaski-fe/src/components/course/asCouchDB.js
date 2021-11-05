const coachesInfo = [
  {
    course: "初體驗",
    id: 1,
    imgSrc: "/assets/img_course/coach-eddie.png",
    imgAlt: "coach Chuan Chun",
    name: "Chuan Chun ",
    liName: "Chun ",
    liExperience: 12,
    liCertificate: "CSIA LEVEL 2",
    liGoodAt: "速滑",
    liLanguage: "中文",
    liToSay:
      "我是Chuan Chun，從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣前幾位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
  {
    course: "初體驗",
    id: 2,
    imgSrc: "/assets/img_course/couch-jasmine.jpg",
    imgAlt: "coach Jessie",
    name: "Jessie Chen",
    liName: "Jessie",
    liExperience: 5,
    liCertificate: "CSIA LEVEL 1",
    liGoodAt: "S型轉彎、走刃",
    liLanguage: "英文、中文",
    liToSay:
      "我是Jessie，有心想要朝滑雪界發展，除了時時增進滑雪技巧和知識外，更培養自已和人相處的說話藝術，尤其是指導小孩/成人需要用都不同方式，再來就是累積教學經驗，成為一位優秀滑雪教練，不再是一個遙不可及的夢想！希望有機會與你們相遇，讓我們一起來創造滑雪奇蹟！",
  },
  {
    course: "技能班",
    id: 3,
    imgSrc: "/assets/img_course/couch-cc.jpg",
    imgAlt: "coach Eddie",
    name: "Eddie Wei22",
    liName: "Eddie",
    liExperience: 15,
    liCertificate: "CSIA LEVEL 3",
    liGoodAt: "豚跳、公園",
    liLanguage: "英文、中文",
    liToSay:
      "我是Eddie，在雪上已經1500多天了，邁向第十五個雪季。從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣第一位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
  {
    course: "技能班",
    id: 4,
    imgSrc: "/assets/img_course/coach-jessie.jpg",
    imgAlt: "coach Jessie",
    name: "Jessie Chen22",
    liName: "Jessie",
    liExperience: 5,
    liCertificate: "CSIA LEVEL 1",
    liGoodAt: "S型轉彎、走刃",
    liLanguage: "英文、中文",
    liToSay:
      "我是Jessie，有心想要朝滑雪界發展，除了時時增進滑雪技巧和知識外，更培養自已和人相處的說話藝術，尤其是指導小孩/成人需要用都不同方式，再來就是累積教學經驗，成為一位優秀滑雪教練，不再是一個遙不可及的夢想！希望有機會與你們相遇，讓我們一起來創造滑雪奇蹟！",
  },
  {
    course: "雪橇車",
    id: 5,
    imgSrc: "/assets/img_course/couch-chun.jpg",
    imgAlt: "coach Eddie",
    name: "Eddie Wei22",
    liName: "Eddie",
    liExperience: 15,
    liCertificate: "CSIA LEVEL 3",
    liGoodAt: "豚跳、公園",
    liLanguage: "英文、中文",
    liToSay:
      "我是Eddie，在雪上已經1500多天了，邁向第十五個雪季。從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣第一位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
  {
    course: "雪橇車",
    id: 6,
    imgSrc: "/assets/img_course/coach-jessie.jpg",
    imgAlt: "coach Jessie",
    name: "Jessie Chen22",
    liName: "Jessie",
    liExperience: 5,
    liCertificate: "CSIA LEVEL 1",
    liGoodAt: "S型轉彎、走刃",
    liLanguage: "英文、中文",
    liToSay:
      "我是Jessie，有心想要朝滑雪界發展，除了時時增進滑雪技巧和知識外，更培養自已和人相處的說話藝術，尤其是指導小孩/成人需要用都不同方式，再來就是累積教學經驗，成為一位優秀滑雪教練，不再是一個遙不可及的夢想！希望有機會與你們相遇，讓我們一起來創造滑雪奇蹟！",
  },
  {
    course: "建冰屋",
    id: 7,
    imgSrc: "/assets/img_course/couch-cc.jpg",
    imgAlt: "coach Eddie",
    name: "Eddie Wei22",
    liName: "Eddie",
    liExperience: 15,
    liCertificate: "CSIA LEVEL 3",
    liGoodAt: "豚跳、公園",
    liLanguage: "英文、中文",
    liToSay:
      "我是Eddie，在雪上已經1500多天了，邁向第十五個雪季。從看影片學滑雪，到精益求精年度最佳滑雪教練，南半球征北半球討，成為台灣第一位澳洲3級單雙板教練。眾生何其多，我願是那個將整本滑雪祕笈交給你的人，因為讓你安全享受滑雪的快樂，便是我最大的成就。",
  },
  {
    course: "建冰屋",
    id: 8,
    imgSrc: "/assets/img_course/coach-jessie.jpg",
    imgAlt: "coach Jessie",
    name: "Jessie Chen22",
    liName: "Jessie",
    liExperience: 5,
    liCertificate: "CSIA LEVEL 1",
    liGoodAt: "S型轉彎、走刃",
    liLanguage: "英文、中文",
    liToSay:
      "我是Jessie，有心想要朝滑雪界發展，除了時時增進滑雪技巧和知識外，更培養自已和人相處的說話藝術，尤其是指導小孩/成人需要用都不同方式，再來就是累積教學經驗，成為一位優秀滑雪教練，不再是一個遙不可及的夢想！希望有機會與你們相遇，讓我們一起來創造滑雪奇蹟！",
  },
];
// 依據回傳的showCourse決定要放哪些教練
export function filterCouches(showCourse) {
  let couchtoShow = coachesInfo.filter((item) => {
    return item.course === showCourse;
  });
  return couchtoShow;
}
