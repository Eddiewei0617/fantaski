import React, { useState, useEffect } from "react";
import FourmUserName from "../../components/forum/ForumUserName";
import ForumEdit from "../../components/forum/ForumEdit";
import { Button } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import {
  insertPostInfo,
  updatePostInfo,
} from "../../components/forum/moduleList";
import { PUBLIC_URL } from "../../config/url";

function NewPost({ forumCategory, setForumCategory, userInfo }) {
  const [editContent, setEditContent] = useState({
    category: "",
    subject: "",
    content: "",
    image: "",
  });
  const [previewFile, setPreviewFile] = useState(null);
  //先判斷如果是編輯文章，把原文章內容存進editContent並顯示在網頁上
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
      if (forumCategory.nowaForumInfo[0].image !== "") {
        setPreviewFile(`${PUBLIC_URL}${forumCategory.nowaForumInfo[0].image}`);
      }
    }
    setForumCategory((cur) => {
      return { ...cur, lastUpdate: false };
    });
  }, []);

  async function handleSubmit(e) {
    if (editContent.category === "") {
      e.preventDefault();
      Swal.fire("請選擇文章類別");
    } else if (editContent.subject === "") {
      e.preventDefault();
      Swal.fire("請輸入文章標題");
    } else if (editContent.content === "") {
      e.preventDefault();
      Swal.fire("請輸入文章內容");
    } else {
      try {
        let formData = new FormData();
        formData.append("category", editContent.category);
        formData.append("subject", editContent.subject);
        formData.append("content", editContent.content);
        formData.append("image", editContent.image);
        //更新文章
        if (forumCategory.nowaForumInfo && forumCategory.nowaForumInfo !== "") {
          formData.append("forum_id", forumCategory.nowaForumInfo[0].id);
          await updatePostInfo(formData);
          setForumCategory((cur) => {
            return { ...cur, nowaForumInfo: "" };
          });
        } else {
          //新增文章
          await insertPostInfo(formData);
        }
      } catch (e) {
        console.log("傳送失敗：", e);
      }
    }
  }
  //圖片上傳
  function handleUpload(e) {
    let file = e.target.files[0];
    //FileReader處理圖片預覽
    let fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      setPreviewFile(e.target.result);
    });
    fileReader.readAsDataURL(file);
    if (file) {
      setEditContent((cur) => {
        return { ...cur, image: file };
      });
    }
  }
  return (
    <>
      <main className="forum-main">
        <div className="container forum-container forum-edit-area">
          <div className="fourmedit-head-area">
            <FourmUserName userInfo={userInfo} />
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
              {previewFile && (
                <div className="p-3 preview-img">
                  <img className="object-fit" src={previewFile} alt="" />
                </div>
              )}
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
                  onClick={async (e) => {
                    await handleSubmit(e);
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
