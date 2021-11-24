import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import ForumThreeDots from "./ForumThreeDots";
import { IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import ForumHeartCommit from "./ForumHeartCommit";
import { BsHeartFill } from "react-icons/bs";
import ForumReply from "./ForumReply";
import ForumAddReply from "./ForumAddReply";
import FourmUserName from "./ForumUserName";
import { forumList, getLikeList, updateForumLike } from "./moduleList";
import moment from "moment";

// 需做登入狀態判斷，是該帳號登入時，會顯示 threeDot

function ForumModal({
  forumModalShow,
  setForumModalShow,
  setForumCategory,
  whichPostToShow,
  replyCount,
  setReplyCount,
  replyList,
}) {
  let modalBody = useRef();
  const [ifLike, setIfLike] = useState(false);
  const [ifScrollDown, setIfScrollDown] = useState(false);
  useEffect(() => {
    //member id先用1
    if (whichPostToShow !== null) {
      getLikeList(whichPostToShow[0].id, 1, setIfLike);
    }
  }, [whichPostToShow]);
  function handleHeartToggle() {
    //member id先用1
    //讓post的愛心數re-render
    whichPostToShow[0].heart = ifLike
      ? whichPostToShow[0].heart - 1
      : whichPostToShow[0].heart + 1;
    //  傳到後端做forum_like資料表的增減＆forum-heart增減
    updateForumLike(whichPostToShow[0].id, 1, ifLike);
    //改變該用戶是否按愛心的狀態
    setIfLike(!ifLike);
  }

  if (whichPostToShow === null || replyCount === null) {
    return <div></div>;
  }

  return (
    <Modal
      show={forumModalShow}
      onHide={() => {
        setForumModalShow(false);
        setForumCategory((cur) => {
          return { ...cur, nowaForumInfo: "" };
        });
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
          <ForumThreeDots
            setForumModalShow={setForumModalShow}
            forum_id={whichPostToShow[0].id}
            setForumCategory={setForumCategory}
          />
        </div>
      </Modal.Header>
      <Modal.Body className="forum-modal-body" ref={modalBody}>
        <div className="forum-contents">
          <h2>{whichPostToShow[0].subject}</h2>
          <p className="forum-kind-color">
            {forumList[whichPostToShow[0].category_id]}
            <span>
              {moment(whichPostToShow[0].created_at).format("YYYY-MM-DD HH:mm")}
            </span>
            {/* <span>10⽉04⽇ 10:08</span> */}
          </p>
          <span className="forum-p">{whichPostToShow[0].content}</span>
          {whichPostToShow[0].image !== "" && (
            <>
              <div className="forum-img">
                {/* 只能上傳jpg、png */}
                <img
                  src={`${PUBLIC_URL}/${whichPostToShow[0].image}`}
                  alt="snowman-defult"
                />
              </div>
              <hr />
            </>
          )}
          {/* 點讚愛心+留言數 */}
          <ForumHeartCommit
            heart={whichPostToShow[0].heart}
            replyCount={replyCount}
          />
          <span className={`${ifLike ? "heart-like" : "heart-count"}`}>
            <BsHeartFill onClick={handleHeartToggle} />
          </span>
        </div>
        <ForumReply
          forumId={whichPostToShow[0].id}
          replyCount={replyCount}
          modalBody={modalBody}
          ifScrollDown={ifScrollDown}
          setIfScrollDown={setIfScrollDown}
        />
      </Modal.Body>

      <Modal.Footer>
        <ForumAddReply
          forum_id={whichPostToShow[0].id}
          replyCount={replyCount}
          setReplyCount={setReplyCount}
          replyList={replyList}
          setIfScrollDown={setIfScrollDown}
        />
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
export default ForumModal;
