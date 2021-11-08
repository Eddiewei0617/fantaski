import React from "react";
import { FiUser } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
function MemberList() {
  return (
    <div>
      <div className="container">
        <nav class="page__menu menu mt-5">
          <ul class="menu__list r-list">
            <li class="menu__group">
              <a href="#0" class="menu__link r-link text-underlined">
                <FiUser /> 會員資料
              </a>
            </li>
            <li class="menu__group">
              <a href="#0" class="menu__link r-link text-underlined">
                <CgNotes /> 購買紀錄
              </a>
            </li>
            <li class="menu__group">
              <a href="#0" class="menu__link r-link text-underlined">
                <BsFillPencilFill /> 論壇管理
              </a>
            </li>
            <li class="menu__group">
              <a href="#0" class="menu__link r-link text-underlined">
                <BsFillBookmarkFill />
                我的收藏
              </a>
            </li>
          </ul>
        </nav>
        <div className="menuLine"></div>
      </div>
    </div>
  );
}

export default MemberList;
