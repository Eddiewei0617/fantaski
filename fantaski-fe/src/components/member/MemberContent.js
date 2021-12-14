import React from "react";

import { AiFillPicture } from "react-icons/ai";

import { FaUserCircle } from "react-icons/fa";
import { API_URL, IMAGE_FORUM_URL, PUBLIC_URL } from "../../config/url";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
  email,
  userInfo,
}) {
  // const STATUS_ = {};
  // const [gender, setgender] = useState(`${sex}`);
  // const [memberbirthday, setmemberbirthday] = useState("");
  const MySwal = withReactContent(Swal);
  const [memberContent, setmemberContent] = useState({
    gender: `${sex}`,
    memberbirthday: `${birthday}`,
    image: img,
  });
  const [uploadfile, setUploadfile] = useState(img);
  const [password, setPassword] = useState({
    oldpassword: "",
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
    // console.log(newMemberContent);
    setmemberContent(newMemberContent);
  };
  const handlePasswordChange = (e) => {
    let newMemberPassword = {
      ...password,
      [e.target.name]: e.target.value,
    };
    // console.log(newMemberPassword);
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
      // console.log(e.target.files[0]);
    } catch (e) {
      console.log("handleUpload錯啦", e);
    }
    window.location.reload();
  }
  // if (memberContent === null) {
  //   return <></>;
  // }
  // console.log(memberContent.memberbirthday);
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    try {
      console.log("password", password);
      let res = await axios.post(`${API_URL}/member/memberPassword`, password, {
        withCredentials: true,
      });
      if (res.data.result) {
        MySwal.fire({
          title: res.data.message,
          icon: "success",
        });
      } else {
        MySwal.fire({
          title: res.data.message,
          icon: "error",
        });
      }
      // console.log(res);
    } catch (e) {
      console.log("handlePasswordSubmit", e);
    }
    // window.location.reload();
  }

  if (userInfo === null) {
    return <></>;
  }
  // console.log("userInfo", userInfo);
  // console.log("uploadfile", uploadfile);
  // console.log("userInfo.image:", userInfo.image, "uploadfile", uploadfile);
  // console.log(typeof userInfo.image);
  // console.log(typeof uploadfile);
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
                <div className="col-5 text-center my-3">舊密碼: </div>
                <div className="col-7 my-3">
                  <div>
                    <input
                      type="password"
                      name="oldpassword"
                      className="w-100 border border-dark"
                      // value={password.password}
                      onChange={handlePasswordChange}
                      required
                      minLength="8"
                    />
                  </div>
                </div>
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
                      minLength="8"
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
                  class="btn member-cancel"
                  data-dismiss="modal"
                  onClick={toggleModaltwo}
                >
                  取消
                </button>
                <button type="submit" class="btn member-confrim">
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
                  {/* <img src={`${UPLOAD_URL}/${uploadfile}`} /> */}
                  <img
                    src={
                      userInfo && uploadfile === null
                        ? `${IMAGE_FORUM_URL}/snowman.svg`
                        : userInfo && uploadfile.includes("https")
                        ? `${uploadfile}`
                        : `${PUBLIC_URL}/${uploadfile}`
                    }
                    alt=""
                  />
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
                <p className="member-level">
                  會員等級:<span>{STATUS_LEVEL[level]}</span>
                </p>
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
                <p className="pb-3 member-level">
                  點數 :<span>{point}點</span>
                </p>
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
            <div className="memberContentRight shadow p-5">
              <div className=" text-left memberContentText mb-3">個人資料</div>
              <div className="row memberContentOutside ">
                <div className="col-12 row text-left ">
                  <div className="col-3 d-flex align-items-center">
                    <div className="memberContentIcon">
                      {" "}
                      <FaUserCircle />
                    </div>
                  </div>
                  <div className="col-6  d-flex align-items-center memberContentBottomText">
                    會員帳號名稱 : {name}
                  </div>
                  <div className="col-3  d-flex align-items-center memberContentBottomText">
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
              </div>
              <form className="memberContentBottomText" onSubmit={handleSubmit}>
                <div className="text-left ">
                  <div className="mt-4 ml-3"> 電子信箱:</div>
                  <div className="text-center pr-5 ">{email}</div>
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
                <div className="text-left m-3">
                  <div className="memberEmailText pb-2 mt-3">生日</div>
                  <div>
                    <input
                      className="ml-5 mt-2"
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
                    <button type="submit" className="btn memberEmailSubmit">
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
