import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFileEarmarkPlus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { delPostInfo } from "./moduleList";

import { Dropdown } from "react-bootstrap";
import React from "react";

function ForumThreeDots({ setForumModalShow, forum_id, setForumCategory }) {
  useEffect(() => {
    setForumCategory((cur) => {
      return { ...cur, lastUpdate: false };
    });
  }, []);
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="forum-more-button">
          <BsThreeDotsVertical className="forum-dots" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/forum/new-post">
            <BsFileEarmarkPlus className="forum-dropdown-btn" />
            新增
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/forum/new-post" role="button">
            <BsPencilSquare className="forum-dropdown-btn" />
            編輯
          </Dropdown.Item>
          <span
            onClick={(e) => {
              console.log(123);
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
          </span>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ForumThreeDots;
