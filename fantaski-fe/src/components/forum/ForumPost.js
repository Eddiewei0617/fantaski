import React, { useState } from "react";

import { IMAGE_FORUM_URL } from "../../config/url";
import ForumModal from "./ForumModal";
import ForumHeartCommit from "./ForumHeartCommit";

function ForumPost() {
  const [forumModalShow, setForumModalShow] = useState(false);
  const handleClose = () => setForumModalShow(false);
  const handleShow = () => setForumModalShow(true);

  return (
    <>
      <section className="forum-post" onClick={handleShow}>
        <div>
          <article className="post">
            <div className="post-head">
              <div className="postuser-color">
                {/*判斷使用者性別來決定頭向顏色*/}
              </div>
              <div className="post-kind">滑雪經驗</div>
              <div className="post-time">3天前</div>
            </div>
            {/*post-head end*/}
            <div className="post-content">
              <h2>滑雪遇到大腳印</h2>
              <div className="post-p-area">
                <div className="post-p">
                  <span>
                    滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️滑雪遇到大腳印，滑雪遇到大腳印（///▽///）️
                  </span>
                </div>
              </div>
              <ForumHeartCommit />
              <div className="post-img">
                <img src={`${IMAGE_FORUM_URL}/post.jpg`} alt="postimg" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <ForumModal show={forumModalShow} onHide={handleClose} />
    </>
  );
}

export default ForumPost;
