import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFileEarmarkPlus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { delPostInfo, getPosterInfo } from "./moduleList";

import { Dropdown } from "react-bootstrap";
import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";

function ForumThreeDots(props) {
  const { setForumModalShow, forum_id, setForumCategory, userInfo } = props;
  useEffect(() => {
    setForumCategory((cur) => {
      return { ...cur, lastUpdate: false };
    });
  }, []);

  if (userInfo === null) {
    return <div></div>;
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="forum-more-button">
          <BsThreeDotsVertical className="forum-dots" />
        </Dropdown.Toggle>
        {/* 文章列表只顯示新增選項 */}
        {!forum_id ? (
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/forum/new-post">
              <div
                onClick={(e) => {
                  if (userInfo && userInfo.code === 1201) {
                    let ifTransferToLogin =
                      window.confirm("須先登入才能發文哦！是否到登入頁？");
                    if (ifTransferToLogin) {
                      e.preventDefault();
                      props.history.push("/login");
                    } else if (ifTransferToLogin === false) {
                      e.preventDefault();
                    }
                  }
                }}
              >
                <BsFileEarmarkPlus className="forum-dropdown-btn" />
                新增
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            {/* 文章彈跳視窗顯示編輯＆刪除 */}
            <Dropdown.Item as={Link} to="/forum/new-post" role="button">
              <BsPencilSquare className="forum-dropdown-btn" />
              編輯
            </Dropdown.Item>
            <div
              onClick={(e) => {
                if (!window.confirm("確定刪除？")) {
                  e.preventDefault();
                } else {
                  setForumCategory((cur) => {
                    return { ...cur, lastUpdate: true };
                  });
                  delPostInfo(forum_id);
                  setForumModalShow(false);
                }
              }}
            >
              <Dropdown.Item as={Link} to="/forum">
                <BsTrash className="forum-dropdown-btn" />
                刪除
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
}

export default withRouter(ForumThreeDots);
