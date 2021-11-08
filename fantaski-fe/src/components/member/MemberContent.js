import React from "react";
import { IMAGE_MEMBER_URL } from "../../config/url";
import { AiFillPicture } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

function MemberContent() {
  return (
    <div>
      <div className="row memberContent text-center">
        <div className="col-4 memberContentHigh  container">
          <div className="memberContentLeft shadow">
            <div className="memberPhoto mt-4 ">
              <img src={`${IMAGE_MEMBER_URL}/melvin-wahlin.jpg`} />
            </div>
            <div className="memberFile shadow-sm ">
              <AiFillPicture /> <input type="file"></input>
            </div>
            <div className="m-2 ">
              <h5>會員等級:雪人</h5>
            </div>
            <div className="m-2 font-weight-light">您在差$1000元成為雪狼</div>
            <div className="p-3 memberName">
              Eddie{" "}
              <a>
                <BsFillPencilFill
                  style={{ width: "25", height: "25", margin: "0 0 10 10" }}
                />
              </a>
            </div>
            <div>
              <h6 className="m-3">點數 :100點</h6>
            </div>
            <button className="memberbtn">修改個人資料</button>
          </div>
        </div>
        <div className="col-8 MemberContentHigh ">
          <div className="memberContentRight shadow p-4">
            <div className=" text-left memberContenRightText">登入方式</div>
            <div className="row memberContentOutside ">
              <div className="col-12 row text-left ">
                <div className="col-3 d-flex align-items-center">
                  <div className="memberContentIcon">
                    {" "}
                    <FcGoogle />
                  </div>
                </div>
                <div className="col-6  d-flex align-items-center">
                  已建立帳號Eddie
                </div>
                <div className="col-3  d-flex align-items-center">
                  <a className="text-right" href="">
                    修改密碼
                  </a>
                </div>
                <div className="memberContenBorder"></div>
              </div>
              <div className="col-12 row text-left">
                <div className="col-3 ">
                  <div className="memberContentIcon">
                    {" "}
                    <FcGoogle />
                  </div>
                </div>
                <div className="col-6">尚未連結Google帳號</div>
                <div className="col-3">
                  {" "}
                  <a href="">前往連結帳號</a>
                </div>
              </div>
              <div className="col-12 row text-left ">
                <div className="col-3 ">
                  <div className="memberContentIcon">
                    {" "}
                    <BsFacebook />
                  </div>
                </div>
                <div className="col-6">尚未連結Facebook帳號</div>
                <div className="col-3">
                  {" "}
                  <a href="">前往連結帳號</a>
                </div>
              </div>
            </div>
          </div>
          {/* 內容下層 */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default MemberContent;
