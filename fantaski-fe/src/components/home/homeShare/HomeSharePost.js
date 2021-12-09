import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import ForumUserName from "../../forum/ForumUserName";

import axios from "axios";
import { API_URL } from "../../../config/url";
// import { ROUTER_COLOR } from "../../../config/StatusShortcut";

// const homeShareFromServer = [
//   {
//     id: 1,
//     sharePost:
//       "這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。這裡應該可以放⼊100-150字(含標點符號)。",
//     // hashTag: ["#綠線", "#教練有趣"],
//     routeColor: "#559360",
//   },
//   {
//     id: 2,
//     sharePost:
//       "雪人（英語：Yeti/Meti/Abominable Snowman；藏文：གཡའ་དྲེད་，威利：g.ya' dred；尼泊爾語：यति；學名:Dinanthropoides nivalis），一種傳說在珠穆朗瑪峰活動的動物，雪人是一種介於人與猿之間的神秘動物，至今尚未有確切的雪人標本提供研究。1889年一位英國陸軍中校LA·沃德爾在錫金東北部發現雪人足跡，並寫成專書出版。1925年希臘攝影家托姆巴基在尼泊爾的塞姆冰河上目睹雪人，這是最早的西方人目擊事件，而雪人一詞開始使用。1951年11月英國珠穆朗瑪峰登山隊隊員艾瑞克·西普頓（Eric Shipton）",
//     // hashTag: ["#紅線", "#滑雪技能班"],
//     routeColor: "#F50505",
//   },
//   {
//     id: 3,
//     sharePost:
//       "如果有個女生在聊完耶誕城的話題以後，主動找你去耶誕城，請問這有代表什麼嗎她是喜歡我還是只是剛好也想去！希望這問題不會太宅男，我不是那種牽個手就在想小孩要取什麼名字的人！只是單純問問也怕誤會因為不確定這是不是好朋友會做的（畢竟耶誕城很浪漫（？））所以上來問問各位大大！",
//     // hashTag: ["#黑線", "#聖誕老人真有趣", "#第一次體驗雪橇車"],
//     routeColor: "#000",
//   },
// ];

function HomeSharePost() {
  // const [indexShare, setIndexShare] = useState(homeShareFromServer);

  // 接後端api至頁面
  const [indexShare, setIndexShare] = useState([]);

  useEffect(async () => {
    let res = await axios.get(`${API_URL}/home/indexforumconent`);
    setIndexShare(res.data);
  }, []);

  return (
    <>
      <div className="home-share-post-area">
        {indexShare.map((item) => {
          return (
            <>
              <div
                className="home-share-bg"
                key={item.id}
                data-aos={"zoom-in-up"}
                data-aos-delay={"300"}
                data-aos-duration={"1000"}
                data-aos-easing={"linear"}
              >
                <div className="home-share-post">
                  <FaQuoteLeft className="quote-color" />
                  <div className="home-share-content">
                    <div className="home-share-p">
                      <p>{item.content}</p>
                    </div>
                    <div className="home-share-under">
                      <div
                        style={{ background: item.pathColor }}
                        className="home-hashtag"
                      >
                        {/* {v.hashTag.map((value) => {
                          return <li key={value}>{value}</li>;
                        })} */}
                        {/* <li>#綠線</li>
                        <li>#初級滑雪班</li> */}
                      </div>
                      <div className="home-share-user">{item.name}</div>
                      <FaQuoteRight className="quote-color" />
                    </div>
                    {/* home-share-under end */}
                  </div>
                  {/* home-share-content end */}
                </div>
                {/* home-share-post end */}
              </div>
              {/* home-share-bg end */}
            </>
          );
        })}
      </div>
      {/* home-share-post-area end */}
    </>
  );
}

export default HomeSharePost;
