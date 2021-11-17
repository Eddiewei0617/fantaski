import React, { useState, useEffect } from "react";
import { IMAGE_FORUM_URL } from "../../config/url";
import ForumModal from "./ForumModal";
import ForumHeartCommit from "./ForumHeartCommit";
import { getForumInfo, forumList } from "./moduleList";
import moment from "moment";

function ForumPost({ forumCategory }) {
  const [forumModalShow, setForumModalShow] = useState(false);
  const [forumInfo, setForumInfo] = useState(null);
  const [whichPostToShow, setWhichPostToShow] = useState(null);
  const [replyCount, setReplyCount] = useState(0);
  // const handleClose = () => setForumModalShow(false);
  const handleShow = (e) => {
    setForumModalShow(true);
    let postId = Number(e.currentTarget.id.split("-").pop());
    let singlepost = forumInfo["postList"].filter((post) => {
      return post.id === postId;
    });
    let singleReply = forumInfo["reply"][postId];
    setWhichPostToShow(singlepost);
    setReplyCount(singleReply);
  };

  useEffect(() => {
    getForumInfo(forumCategory, setForumInfo);
  }, [forumCategory]);

  if (forumInfo === null) {
    return <div className="text-center m-3">尚未有人開啟討論...</div>;
  }

  return (
    <>
      {forumInfo["postList"].map((post, i) => {
        return (
          <>
            <section
              className="forum-post"
              onClick={handleShow}
              id={`post-${post.id}`}
            >
              <div>
                <article className="post">
                  <div className="post-head">
                    <div className="postuser-color">
                      {/*判斷使用者性別來決定頭向顏色*/}
                    </div>
                    <div className="post-kind">
                      {forumList[post.category_id]}
                    </div>
                    <div className="post-time">
                      {moment(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    {/* <div className="post-time">3天前</div> */}
                  </div>
                  {/*post-head end*/}
                  <div className="post-content">
                    <h2>{post.subject}</h2>
                    <div className="post-p-area">
                      <div className="post-p">
                        <span>{post.content}</span>
                      </div>
                    </div>
                    <ForumHeartCommit
                      heart={post.heart}
                      reply={forumInfo["reply"][post.id]}
                    />
                    {post.image !== "" && (
                      <div className="post-img">
                        <img
                          src={`${IMAGE_FORUM_URL}/${post.image}`}
                          alt="postimg"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </section>
          </>
        );
      })}
      {forumInfo && (
        <ForumModal
          forumModalShow={forumModalShow}
          setForumModalShow={setForumModalShow}
          whichPostToShow={whichPostToShow}
          reply={replyCount}
        />
      )}
    </>
  );
}

export default ForumPost;
