import React from "react";
import FourmUserName from "../../components/forum/ForumUserName";
import ForumEdit from "../../components/forum/ForumEdit";
import { Button } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";

function NewPost() {
  return (
    <>
      <main className="forum-main">
        <div className="container forum-container forum-edit-area">
          <div className="fourmedit-head-area">
            <FourmUserName />
            {/* <Button>Close</Button> */}
          </div>
          <hr />
          <ForumEdit />
          <div className="add-icon">
            <BsCardImage className="add-img-icon" size={30} />
            <div className="add-btn">
              <button className="cancle-btn">
                <Link to="/forum" className="post-btn-link">
                  取消
                </Link>
              </button>
              <button type="submit" className="confrim-btn">
                <Link to="/forum/news" className="post-btn-link">
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
