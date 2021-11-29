import React, { useState } from "react";

import HomeTitle from "./HomeTitle";
import { IMAGE_HOME_URL } from "../../config/url";
import { Link } from "react-router-dom";

const homeForumNewsFromServer = [
  {
    id: 1,
    kind: "滑雪經驗",
    title: "滑雪遇到大雪怪",
    content:
      "滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️",
    replyNum: "0",
  },
  {
    id: 2,
    kind: "課程分享",
    title: "聖誕老人真可愛",
    content:
      "聖誕老人真可愛(///▽///）️️聖誕老人真可愛(///▽///）️️聖誕老人真可愛(///▽///）️️聖誕老人真可愛(///▽///）️️聖誕老人真可愛(///▽///）️️聖誕老人真可愛(///▽///）️️",
    replyNum: "0",
  },
];

const homeForumHotFromServer = [
  {
    id: 1,
    kind: "裝備體驗",
    title: "滑雪板又酷又好用",
    content:
      "酷炫滑雪板(>////<)酷炫滑雪板(>////<)酷炫滑雪板(>////<)酷炫滑雪板(>////<)酷炫滑雪板(>////<)酷炫滑雪板(>////<)酷炫滑雪板(>////<)",
    replyNum: "20",
  },
  {
    id: 2,
    kind: "滑雪課程",
    title: "小熊真可愛",
    content:
      "小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️小熊真可愛(///▽///）️️",
    replyNum: "50",
  },
];

function HomeForum() {
  const mainTitle = {
    title: "滑雪論壇",
    subTitle: "奇聞軼事 | 天⾺⾏空",
  };

  const [indexForumNews, setIndexForumNews] = useState(homeForumNewsFromServer);

  const [indexForumHot, setIndexForumHot] = useState(homeForumHotFromServer);

  return (
    <>
      <section className="home-forum home-section">
        <div className="container">
          <div className="home-forum-title">
            <HomeTitle title={mainTitle.title} subTitle={mainTitle.subTitle} />
          </div>
          {/* home-title-area end */}

          <div className="home-froum-area">
            <div className="home-froum-text">
              <h2>最新文章</h2>
            </div>

            {indexForumNews.map((v, i) => {
              return (
                <>
                  <div className="home-forum-p">
                    <div className="home-post-head" key={v.i}>
                      <div className="postuser-color"></div>
                      <div className="home-post-kind">{v.kind}</div>
                    </div>
                    {/* home-post-head end */}

                    <div className="home-post-content">
                      <h2>{v.title}</h2>
                      <div className="home-post-p-area">
                        <div className="home-post-p">
                          <span>{v.content}</span>
                        </div>
                        {/* home-post-p end */}
                        <div className="home-reply-more">
                          <div className="home-commit-num">
                            留言數:<span>{v.replyNum}</span>則
                          </div>
                          {/* home-commit-num end */}
                          <Link to="/forum" className="goto-check">
                            <div className="home-arrow-1">前往觀看</div>
                          </Link>
                          {/* home-arrow-1 end */}
                        </div>
                        {/* home-reply-more end */}
                      </div>
                      {/* home-post-p-area end */}
                    </div>
                    {/* home-post-content end */}
                  </div>
                  {/* home-forum-p end */}
                </>
              );
            })}
          </div>
          {/* home-froum-area end */}

          <div className="home-froum-area">
            <div className="home-froum-text">
              <h2>熱門文章</h2>
            </div>

            {indexForumHot.map((v, i) => {
              return (
                <>
                  <div className="home-forum-p">
                    <div className="home-post-head" key={v.i}>
                      <div className="postuser-color"></div>
                      <div className="home-post-kind">{v.kind}</div>
                    </div>
                    {/* home-post-head end */}

                    <div className="home-post-content">
                      <h2>{v.title}</h2>
                      <div className="home-post-p-area">
                        <div className="home-post-p">
                          <span>{v.content}</span>
                        </div>
                        {/* home-post-p end */}
                        <div className="home-reply-more">
                          <div className="home-commit-num">
                            留言數:<span>{v.replyNum}</span>則
                          </div>
                          {/* home-commit-num end */}
                          <Link to="/forum" className="goto-check">
                            <div className="home-arrow-1">前往觀看</div>
                          </Link>
                          {/* home-arrow-1 end */}
                        </div>
                        {/* home-reply-more end */}
                      </div>
                      {/* home-post-p-area end */}
                    </div>
                    {/* home-post-content end */}
                  </div>
                  {/* home-forum-p end */}
                </>
              );
            })}
          </div>
          {/* home-froum-area end */}
        </div>
        {/* container end */}
      </section>
    </>
  );
}

export default HomeForum;
