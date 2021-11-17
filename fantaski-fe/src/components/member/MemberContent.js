import React from "react";
import { ORDERIMAGE_URL } from "../../config/url";
import { AiFillPicture } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
// import "./MemberContent.css";

function MemberContent() {
  return (
    <div>
      <div className="row memberContent text-center">
        <div className="col-4 memberContentHigh  container">
          <div className="memberContentLeft shadow  d-flex flex-column justify-content-around">
            <div className="memberPhotoRealtive">
              <div className="memberPhoto mt-4 ">
                <img src={`${ORDERIMAGE_URL}/penguin.png`} />
              </div>
              <div className="memberFile shadow-sm ">
                <AiFillPicture /> <input type="file"></input>
              </div>
            </div>
            <div className="m-2 font-weight-bold">
              <h5>會員等級:雪人</h5>
            </div>

            <div className="p-3 memberName">
              Eddie{" "}
              {/* <a>
                <BsFillPencilFill
                  style={{ width: "25", height: "25", margin: "0 0 10 10" }}
                />
              </a> */}
            </div>
            <div className="memberContenBorderBotton"></div>
            <div>
              <h6 className="m-3">點數 :100點</h6>
            </div>
            <button
              className="memberbtn mx-auto mb-5"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              修改個人資料
            </button>
          </div>
        </div>

        <div className="col-8 MemberContentHigh ">
          <div className="memberContentRight shadow p-3">
            <div className=" text-left memberContentRightText mb-3">
              登入方式
            </div>
            <div className="row memberContentOutside ">
              <div className="col-12 row text-left ">
                <div className="col-3 d-flex align-items-center">
                  <div className="memberContentIcon">
                    {" "}
                    <FcGoogle />
                  </div>
                </div>
                <div className="col-6  d-flex align-items-center ">
                  已建立帳號Eddie
                </div>
                <div className="col-3  d-flex align-items-center">
                  <a className="text-right" href="">
                    修改密碼
                  </a>
                </div>
                <div className="memberContentBorderBotton"></div>
              </div>
              <div className="col-12 row text-left">
                <div className="col-3 ">
                  <div className="memberContentIcon">
                    {" "}
                    <FcGoogle />
                  </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  尚未連結Google帳號
                </div>
                <div className="col-3 d-flex align-items-center">
                  {" "}
                  <a href="">前往連結帳號</a>
                </div>
                <div className="memberContentBorderBotton"></div>
              </div>
              <div className="col-12 row text-left ">
                <div className="col-3 ">
                  <div className="memberContentIcon">
                    {" "}
                    <BsFacebook />
                  </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  尚未連結Facebook帳號
                </div>
                <div className="col-3 d-flex align-items-center">
                  {" "}
                  <a href="">前往連結帳號</a>
                </div>
                <div className="memberContentBorderBotton"></div>
              </div>
            </div>
            <from>
              <div className="text-left">
                <div className=" pb-2 m-3">性別</div>
                <div class="form-check form-check-inline ml-5">
                  <input
                    class="form-check-input radioWidth"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                  />
                  <label class="form-check-label" for="male">
                    男
                  </label>
                </div>
                <div class="form-check form-check-inline ml-5">
                  <input
                    class="form-check-input radioWidth"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label class="form-check-label" for="female">
                    女
                  </label>
                </div>
                <div class="form-check form-check-inline ml-5">
                  <input
                    class="form-check-input radioWidth"
                    type="radio"
                    name="gender"
                    id="sexual"
                    value="sexual"
                  />
                  <label class="form-check-label" for="sexual">
                    多元性別
                  </label>
                </div>
              </div>
              {/* --生日-- */}
              <div className="text-left">
                <div className="memberEmailText pb-2 m-3">生日</div>
                <div>
                  <input
                    className="ml-5"
                    type="date"
                    value="1996-01-03"
                  ></input>
                </div>
                <div>
                  <input
                    type="submit"
                    value="儲存"
                    className="btn btn-danger memberEmailSubmit"
                  />
                </div>
              </div>
            </from>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-4"></div>
        <div className="col-8 MemberContentHigh ">
          <div className="memberContentRight shadow p-3"></div>
        </div>
      </div> */}
    </div>
  );
}

export default MemberContent;
