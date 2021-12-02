import React from "react";
import { Link } from "react-router-dom";
import { ORDERIMAGE_URL } from "../../config/url";
import { AiFillPicture } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { API_URL, UPLOAD_URL } from "../../config/url";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import "./MemberContent.css";
import { useState } from "react";
import { STATUS_LEVEL } from "../../config/StatusShortcut";
import Member from "../../pages/member/Member";
import axios from "axios";
function MemberContent({
  toggleModal,
  name,
  point,
  sex,
  level,
  birthday,
  img,
}) {
  // const STATUS_ = {};
  // const [gender, setgender] = useState(`${sex}`);
  // const [memberbirthday, setmemberbirthday] = useState("");
  const MySwal = withReactContent(Swal);
  const [memberContent, setmemberContent] = useState({
    gender: `${sex}`,
    memberbirthday: `${birthday}`,
    image: `${img}`,
  });
  const [uploadfile, setUploadfile] = useState(`${img}`);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  // 儲存所有的欄位錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showmodaltwo, setshowmodaltwo] = useState("false");
  function toggleModaltwo() {
    setshowmodaltwo(!showmodaltwo);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${API_URL}/member/membersave`,
        memberContent,
        {
          withCredentials: true,
        }
      );
      MySwal.fire({
        title: "儲存成功",
        icon: "success",
      });
      console.log(res);
    } catch (e) {
      console.log("handleSubmit", e);
    }
    // window.location.reload();
  }
  const handleChange = (e) => {
    let newMemberContent = {
      ...memberContent,
      [e.target.name]: e.target.value,
    };
    console.log(newMemberContent);
    setmemberContent(newMemberContent);
  };
  const handlePasswordChange = (e) => {
    let newMemberPassword = {
      ...password,
      [e.target.name]: e.target.value,
    };
    console.log(newMemberPassword);
    setPassword(newMemberPassword);
  };
  async function handleUpload(e) {
    // let newMemberUpload = { ...memberContent };
    // newMemberUpload.image = e.target.files[0];
    // setUploadfile(newMemberUpload);
    // console.log(newMemberUpload);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      // formData.append("id", 3);
      let res = await axios.post(`${API_URL}/memberUpload/`, formData, {
        withCredentials: true,
      });
      console.log(e.target.files[0]);
    } catch (e) {
      console.log("handleUpload錯啦", e);
    }
    window.location.reload();
  }
  // if (memberContent === null) {
  //   return <></>;
  // }
  console.log(memberContent.memberbirthday);
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/member/memberPassword`, password, {
        withCredentials: true,
      });
      MySwal.fire({
        title: "密碼修改成功",
        icon: "success",
      });
      console.log(res);
    } catch (e) {
      console.log("handlePasswordSubmit", e);
    }
    // window.location.reload();
  }

  return (
    <>
      {/* 隱藏彈跳視窗 */}
      <form onSubmit={handlePasswordSubmit}>
        <div
          class={`memberpop ${showmodaltwo ? "modal" : ""}`}
          id="exampleModaltwo"
          tabindex="-1"
          aria-labelledby="exampleModalLabeltwo"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  class="modal-title memberpopTitle"
                  id="exampleModalLabeltwo"
                >
                  修改密碼
                </h5>
              </div>
              <div class="modal-body m-4 row align-items-center">
                <div className="col-5 text-center my-3">新密碼: </div>
                <div className="col-7 my-3">
                  <div>
                    <input
                      type="password"
                      name="password"
                      className="w-100 border border-dark"
                      value={password.password}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                  </div>
                </div>
                <div className="col-5 text-center my-3">確認密碼: </div>
                <div className="col-7 my-3">
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-100 border border-dark"
                      value={password.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                    {/* {fieldErrors.confirmPassword !== "" && (
                    <div className="error">{fieldErrors.confirmPassword}</div>
                  )} */}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={toggleModaltwo}
                >
                  取消
                </button>
                <button type="submit" class="btn btn-danger">
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* 隱藏彈跳視窗結束 */}
      <div>
        <div className="row memberContent text-center">
          <div className="col-4 memberContentHigh  container">
            <div className="memberContentLeft shadow  d-flex flex-column justify-content-around">
              <div className="memberPhotoRealtive">
                <div className="memberPhoto mt-4 ">
                  <img src={`${UPLOAD_URL}/${uploadfile}`} />
                </div>
                <div className="memberFile shadow-sm ">
                  <AiFillPicture />{" "}
                  <input
                    type="file"
                    name="image"
                    onChange={handleUpload}
                  ></input>
                </div>
              </div>
              <div className="m-2 font-weight-bold">
                <h5>會員等級:{STATUS_LEVEL[level]}</h5>
              </div>

              <div className="p-3 memberName">
                {name}{" "}
                {/* <a>
                <BsFillPencilFill
                  style={{ width: "25", height: "25", margin: "0 0 10 10" }}
                />
              </a> */}
              </div>
              <div className="memberContenBorderBotton"></div>
              <div>
                <h5 className="pb-3">點數 :{point}點</h5>
              </div>
              <button
                className="memberbtn mx-auto mb-5"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={toggleModal}
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
                      <FaUserCircle />
                    </div>
                  </div>
                  <div className="col-6  d-flex align-items-center ">
                    已建立帳號 {name}
                  </div>
                  <div className="col-3  d-flex align-items-center">
                    <a
                      type="button"
                      className="text-right text-decoration-none"
                      href="#"
                      data-toggle="modal"
                      data-target="#exampleModaltwo"
                      onClick={toggleModaltwo}
                    >
                      修改密碼
                    </a>
                  </div>
                  <div className="memberContentBorderBotton"></div>
                </div>
                <div className="col-12 row text-left">
                  <div className="col-3 ">
                    <div className="memberContentIcon border border-dark">
                      {" "}
                      <FcGoogle />
                    </div>
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    尚未連結Google帳號
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button
                      href="#"
                      type="button"
                      className="text-decoration-none"
                    >
                      前往連結帳號
                    </button>
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
                    <a href="#" type="button" className="text-decoration-none">
                      前往連結帳號
                    </a>
                  </div>
                  <div className="memberContentBorderBotton"></div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="text-left">
                  <div className=" pb-2 m-3">性別</div>
                  <div class="form-check form-check-inline ml-5">
                    <input
                      class="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={memberContent.gender === "male"}
                      onChange={handleChange}
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
                      checked={memberContent.gender === "female"}
                      // checked={sex === "female" ? true : false}
                      // onChange={(e) => {
                      //   setgender(e.target.value);
                      // }}
                      onChange={handleChange}
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
                      // checked={sex === "sexual" ? true : false}
                      checked={memberContent.gender === "sexual"}
                      onChange={handleChange}
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
                      name="memberbirthday"
                      // value={memberbirthday ? memberbirthday : birthday}
                      defaultValue={birthday}
                      // onChange={(e) => {
                      //   setmemberbirthday(e.target.value);
                      // }}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-danger memberEmailSubmit"
                    >
                      儲存
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberContent;
