import React from "react";
import ForumButton from "../../components/forum/ForumButton";
import ForumHeadBtn from "../../components/forum/ForumHeadBtn";
import ForumPost from "../../components/forum/ForumPost";
import ForumThreeDot from "../../components/forum/ForumThreeDot";

function Fourm() {
  return (
    <>
      <main className="forum-main">
        <div className="container forum-container">
          {/* area1 各區塊 button 區  */}
          <ForumButton />
          {/* area2 內文區 */}
          <div className="forum-content">
            <section className="forum-content-head">
              <div className="content-head-buttonall">
                <ForumHeadBtn />
                {/* content-head-button end */}
                <ForumThreeDot />
                {/* forum-more-button end */}
              </div>
              {/* content-head-buttonall end */}
            </section>
            {/*forum-content-head end*/}

            {/* ====post 區==== */}
            <ForumPost />
          </div>
        </div>
      </main>
    </>
  );
}

export default Fourm;
