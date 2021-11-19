import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ForumThreeDots from "./ForumThreeDots";
import { IMAGE_FORUM_URL } from "../../config/url";
import ForumHeartCommit from "./ForumHeartCommit";
import { BsHeartFill } from "react-icons/bs";
import ForumReply from "./ForumReply";
import ForumAddReply from "./ForumAddReply";
import FourmUserName from "./ForumUserName";
import { forumList } from "./moduleList";
import moment from "moment";

// 需做登入狀態判斷，是該帳號登入時，會顯示 threeDot

function ForumModal({
  forumModalShow,
  setForumModalShow,
  whichPostToShow,
  reply,
}) {
  if (whichPostToShow === null || reply === null) {
    return <div></div>;
  }
  return (
    <Modal
      show={forumModalShow}
      onHide={() => {
        setForumModalShow(false);
      }}
      size="lg"
      aria-labelledby="forumModalView"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="forumModalView">
          <FourmUserName forum_id={whichPostToShow[0].id} />
        </Modal.Title>
        <div className="forum-pop-threedot">
          <ForumThreeDots />
        </div>
      </Modal.Header>
      <Modal.Body className="forum-modal-body">
        <div className="forum-contents">
          <h2>{whichPostToShow[0].subject}</h2>
          <p className="forum-kind-color">
            {forumList[whichPostToShow[0].category_id]}
            <span>
              {moment(whichPostToShow[0].created_at).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
            {/* <span>10⽉04⽇ 10:08</span> */}
          </p>
          <span className="forum-p">{whichPostToShow[0].content}</span>
          {whichPostToShow[0].image !== "" && (
            <>
              <div className="forum-img">
                {/* 只能上傳jpg、png */}
                <img
                  src={`${IMAGE_FORUM_URL}/${whichPostToShow[0].image}`}
                  alt="snowman-defult"
                />
              </div>
              <hr />
            </>
          )}
          {/* 點讚愛心+留言數 */}
          <ForumHeartCommit heart={whichPostToShow[0].heart} reply={reply} />
          <span className="heart-count">
            <BsHeartFill />
          </span>
        </div>
        <ForumReply forumId={whichPostToShow[0].id} reply={reply} />
      </Modal.Body>

      <Modal.Footer>
        <ForumAddReply />
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
export default ForumModal;
