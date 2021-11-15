import { Link } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFileEarmarkPlus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

import { Dropdown } from "react-bootstrap";

function ForumThreeDots() {
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
          <Dropdown.Item role="button">
            <BsPencilSquare className="forum-dropdown-btn" />
            編輯
          </Dropdown.Item>
          <Dropdown.Item role="submit">
            <BsTrash className="forum-dropdown-btn" />
            刪除
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ForumThreeDots;
