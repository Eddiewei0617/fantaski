import MemberList from "../../components/member/MemberList";
import ForumHeartCommit from "../../components/forum/ForumHeartCommit";
import { PUBLIC_URL, API_URL } from "../../config/url";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FORUM_CATEGORY } from "../../config/StatusShortcut";
function MemberForum() {
  const [article, setArticle] = useState([]);

  useEffect(async () => {
    try {
      let res = await axios.get(`${API_URL}/member/memberArticle`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.length == 0) {
        console.log(res.data);
        setArticle(null);
      } else {
        setArticle(res.data);
      }
    } catch (err) {}
  }, []);

  return (
    <div>
      <MemberList page={3} />
      <div className="container memberForumContentTitle mt-4 ">我的文章</div>
      <div className="container memberForumContent ">
        {/* <div className="memberForumContentBorder mx-auto "></div>  */}
        <div className="articleWrapper">
          {article ? (
            <>
              {article.map((item) => {
                return (
                  <section
                    className="forum-post"
                    // onClick={handleShow}
                    // id={`post-${post.id}`}
                  >
                    <div>
                      <article className="postMember w-100">
                        <div className="post-head">
                          <div className="postuser-color">
                            {/*判斷使用者性別來決定頭向顏色*/}
                          </div>
                          <div className="post-kind">
                            {FORUM_CATEGORY[item.category_id]}
                          </div>
                          <div className="post-time">{item.created_at}</div>
                          {/* <div className="post-time">3天前</div> */}
                        </div>
                        {/*post-head end*/}
                        <div className="post-content mb-5">
                          <h2>{item.subject}</h2>
                          <div className="post-p-area">
                            <div className="post-p">
                              <span>{item.content}</span>
                            </div>
                          </div>
                          {/* <ForumHeartCommit /> */}
                          {/* {post.image !== "" && (
                  <div className="post-img">
                    <img src={`${PUBLIC_URL}${post.image}`} alt="postimg" />
                  </div>
                )} */}

                          {item.image !== "" && (
                            <div className="post-img">
                              <img
                                src={`${PUBLIC_URL}${item.image}`}
                                alt="postimg"
                              />
                            </div>
                          )}
                        </div>
                      </article>
                    </div>
                  </section>
                );
              })}{" "}
            </>
          ) : (
            <div className="memberForum">
              <div>
                {" "}
                您還沒有發文過，請登入後到滑雪論壇新增文章
                <Link to="/forum">
                  <br />
                  <a>前往論壇發文</a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberForum;
