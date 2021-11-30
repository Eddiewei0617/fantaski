import React, { useState } from "react";
import ForumButton from "../../components/forum/ForumButton";
import ForumHeadBtn from "../../components/forum/ForumHeadBtn";
import ForumPost from "../../components/forum/ForumPost";
import ForumThreeDots from "../../components/forum/ForumThreeDots";

function Fourm({ forumCategory, setForumCategory, userInfo }) {
  return (
    <>
      <main className="forum-main">
        <div className="container forum-container">
          {/* area1 各區塊 button 區  */}
          <ForumButton setForumCategory={setForumCategory} />
          {/* area2 內文區 */}
          <div className="forum-content">
            <section className="forum-content-head">
              <div className="content-head-buttonall">
                <ForumHeadBtn
                  forumCategory={forumCategory}
                  setForumCategory={setForumCategory}
                />
                {/* content-head-button end */}
                <ForumThreeDots
                  setForumCategory={setForumCategory}
                  userInfo={userInfo}
                />
                {/* forum-more-button end */}
              </div>
              {/* content-head-buttonall end */}
            </section>
            {/*forum-content-head end*/}

            {/* ====post 區==== */}
            <ForumPost
              forumCategory={forumCategory}
              setForumCategory={setForumCategory}
              userInfo={userInfo}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Fourm;
