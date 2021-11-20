import React, { useState, useEffect } from "react";
import FourmUserName from "../../components/forum/ForumUserName";
import ForumEdit from "../../components/forum/ForumEdit";
import { Button } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  insertPostInfo,
  updatePostInfo,
} from "../../components/forum/moduleList";

function NewPost({ forumCategory, setForumCategory }) {
  const [editContent, setEditContent] = useState({
    category: "",
    subject: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (forumCategory.nowaForumInfo && forumCategory.nowaForumInfo !== "") {
      let originalPost = forumCategory.nowaForumInfo[0];
      setEditContent((cur) => {
        return {
          category: originalPost.category_id,
          subject: originalPost.subject,
          content: originalPost.content,
          image: originalPost.image,
        };
      });
    }
    setForumCategory((cur) => {
      return { ...cur, lastUpdate: false };
    });
  }, []);

  function handleSubmit(e) {
    if (editContent.category === "") {
      e.preventDefault();
      alert("請選擇文章類別");
    } else if (editContent.subject === "") {
      e.preventDefault();
      alert("請輸入文章標題");
    } else if (editContent.content === "") {
      e.preventDefault();
      alert("請輸入文章內容");
    } else {
      try {
        let formData = new FormData();
        formData.append("member_id", "1");
        formData.append("category", editContent.category);
        formData.append("subject", editContent.subject);
        formData.append("content", editContent.content);
        formData.append("image", editContent.image);
        //更新文章
        if (forumCategory.nowaForumInfo && forumCategory.nowaForumInfo !== "") {
          formData.append("forum_id", forumCategory.nowaForumInfo[0].id);
          updatePostInfo(formData);
        } else {
          //新增文章
          insertPostInfo(formData);
        }
      } catch (e) {
        console.log("傳送失敗：", e);
      }
    }
  }
  //圖片上傳
  function handleUpload(e) {
    if (e.target.files[0]) {
      setEditContent((cur) => {
        return { ...cur, image: e.target.files[0] };
      });
    }
  }
  return (
    <>
      <main className="forum-main">
        <div className="container forum-container forum-edit-area">
          <div className="fourmedit-head-area">
            <FourmUserName />
            {/* <Button>Close</Button> */}
          </div>
          <hr />
          <ForumEdit
            editContent={editContent}
            setEditContent={setEditContent}
          />
          <div className="add-icon">
            <label>
              <input
                className="d-none"
                type="file"
                name="image"
                onChange={handleUpload}
              />
              <BsCardImage className="add-img-icon" size={30} />
              <span className="p-3">已上傳：{editContent.image.name}</span>
            </label>
            <div className="add-btn">
              <button className="cancle-btn">
                <Link
                  to="/forum"
                  className="post-btn-link"
                  onClick={(e) => {
                    setForumCategory((cur) => {
                      return {
                        ...cur,
                        nowaForumInfo: "",
                      };
                    });
                  }}
                >
                  取消
                </Link>
              </button>
              <button type="button" className="confrim-btn">
                <Link
                  to="/forum"
                  className="post-btn-link"
                  onClick={(e) => {
                    handleSubmit(e);
                    setForumCategory((cur) => {
                      return {
                        ...cur,
                        isHot: false,
                        forumCategory: 0,
                        lastUpdate: true,
                      };
                    });
                  }}
                >
                  送出
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NewPost;
