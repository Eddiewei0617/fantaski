import { IMAGE_HOME_URL } from "../../config/url";

export const HomeCourseList = [
  {
    id: 1,
    image: `${IMAGE_HOME_URL}/home_course01.jpg`,
    // name: "初級課程",
    details: ["基本滑雪動作(落葉飄)", "滑雪相關知識"],
    routeCate: "綠線",
    routeColor: "#559360",
    price: 2000,
    // starNum: 2.5,
    // stu_limit: 4,
    href: "beginner",
  },
  {
    id: 2,
    image: `${IMAGE_HOME_URL}/home_course03.jpg`,
    // name: "技能課程",
    details: [
      "滑雪進階動作",
      "carving 、 J-turn 、 S-turn、 平地花式 、 Park(箱⼦ 、 管⼦)",
    ],
    routeCate: "紅線",
    routeColor: "#F50505",
    price: 4000,
    // starNum: 4.5,
    // stu_limit: 14,
    href: "skill",
  },
  {
    id: 3,
    image: `${IMAGE_HOME_URL}/home_course02.jpg`,
    // name: "體驗課程",
    details: ["聖誕⽼⼈與⿅"],
    routeCate: "黑線",
    routeColor: "#000",
    price: 6000,
    // starNum: 5,
    // stu_limit: 6,
    href: "sled",
  },
];
