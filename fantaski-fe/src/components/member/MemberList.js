import React from "react";
import { FiUser } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function MemberList({}) {
  return (
    <div>
      <div className="container">
        <nav className="page__menu menu mt-5">
          <ul className="menuList r-list">
            <li className="">
              <Link to="/member" className="menuLink r-link text-underlined">
                <FiUser /> 會員資料
              </Link>
            </li>
            <li className="">
              <Link
                to="/memberRecord"
                className="menuLink r-link text-underlined"
              >
                <CgNotes /> 購買紀錄
              </Link>
            </li>
            <li className="">
              <Link
                to="/memberForum"
                className="menuLink r-link text-underlined"
              >
                <BsFillPencilFill /> 我的文章
              </Link>
            </li>

            <li className="">
              <Link
                to="/MemberCollect"
                className="menuLink r-link text-underlined"
              >
                <BsFillBookmarkFill />
                我的收藏
              </Link>
            </li>

            <li className="">
              <Link
                to="/memberComment"
                className="menuLink r-link text-underlined"
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
