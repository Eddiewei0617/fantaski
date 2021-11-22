import React from "react";
import { FiUser } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function MemberList() {
  return (
    <div>
      <div className="container">
        <nav class="page__menu menu mt-5">
          <ul class="menuList r-list">
            <li class="">
              <a href="#0" class="menuLink r-link text-underlined">
                <FiUser /> 會員資料
              </a>
            </li>
            <li class="">
              <a href="#0" class="menuLink r-link text-underlined">
                <CgNotes /> 購買紀錄
              </a>
            </li>
            <li class="">
              <a href="#0" class="menuLink r-link text-underlined">
                <BsFillPencilFill /> 論壇管理
              </a>
            </li>
            <li class="">
              <a href="#0" class="menuLink r-link text-underlined">
                <BsFillBookmarkFill />
                我的收藏
              </a>
            </li>
            <li class="">
              <Link
                to="/membercomments"
                class="menuLink r-link text-underlined"
              >
                <AiFillStar />
                我的點評
              </Link>
            </li>
          </ul>
        </nav>
        <div className="menuLine"></div>
      </div>
    </div>
  );
}

export default MemberList;
