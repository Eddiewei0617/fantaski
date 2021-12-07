import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 組件
import ThreePartyLink from "../components/login/ThreePartyLink";
import OverImg from "../components/login/OverImg";

// icon
import { FaUser, FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

// 後端
import axios from "axios";
import { API_URL } from "../config/url";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

function Login(props) {
  const { userInfo, setUserInfo, fBloginState, setFbLoginState } = props;

  // 頁面切換程式
  const [isContainerActive, setIsContainerActive] = useState(false);
  const signUpBtn = () => {
    setIsContainerActive(false);
  };
  const signInBtn = () => {
    setIsContainerActive(true);
  };

  // 後端程式
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  //註冊呼叫api
  async function handleRegSubmit(e) {
    e.preventDefault();
    try {
      let resReg = await axios.post(`${API_URL}/auth/register`, registerInfo);
      console.log("resReg", resReg);
      if (resReg.data.code == 1101) {
        Swal.fire("錯誤", "該email已被註冊", "error");
      } else if (resReg.data.code == 99) {
        console.log(resReg.data.message[0].msg);
        Swal.fire("錯誤", resReg.data.message[0].msg, "error");
      } else if (resReg.data.code == 0) {
        Swal.fire("Register", "註冊成功", "success");
        let resLog = await axios.post(`${API_URL}/auth/login`, registerInfo, {
          withCredentials: true,
        });
        await setUserInfo(resLog.data.member);
        props.history.goBack();
      }
    } catch (e) {
      console.log(e);
      Swal.fire("錯誤", "請洽系統管理員", "error");
    }
  }
  //登入呼叫api
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/auth/login`, loginInfo, {
        withCredentials: true,
      });
      if (res.data.code == 1102) {
        Swal.fire("錯誤", "帳號或密碼錯誤，請重新登入", "error");
      } else {
        setUserInfo(res.data.member);
        Swal.fire("Login", "登入成功", "success");
        //抓看看seesion有沒有登入資料
        try {
          let resInfo = await axios.get(`${API_URL}/auth/userInfo`, {
            withCredentials: true,
          });
          console.log(resInfo.data);
        } catch (e) {
          console.log(e);
        }

        props.history.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  }
  //input輸入值onchange事件
  //login
  function handleLoginChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setLoginInfo((cur) => {
      return { ...cur, [name]: value };
    });
  }
  //register
  function handleRegisterChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setRegisterInfo((cur) => {
      return { ...cur, [name]: value };
    });
  }

  return (
    <>
      <main className="login-main">
        <div
          id="container"
          className={`container login-container ${
            isContainerActive ? "right-panel-active" : ""
          }`}
        >
          {/* 登入 */}
          <div
            className={`form-container ${
              isContainerActive ? "sign-in-container" : "sign-up-container"
            }`}
          >
            <h2>登入</h2>
            <div className="form-center-area">
              {/* 第三方連結(fb & google) */}
              <ThreePartyLink
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                fBloginState={fBloginState}
                setFbLoginState={setFbLoginState}
              />
              {/* three-party end */}
              <div className="login-or">
                <span>或</span>
              </div>
              <form className="form-sign-up" onSubmit={handleLoginSubmit}>
                <div className="form-info">
                  <FaUser className="form-info-icon" />
                  <input
                    type="mail"
                    name="email"
                    placeholder="帳號:"
                    value={loginInfo.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="form-info">
                  <FaLock className="form-info-icon" />
                  {/* 密碼長度最多 20 最少 8  可自行調整但登入/註冊要統一*/}
                  <input
                    type="password"
                    name="password"
                    placeholder="密碼:"
                    value={loginInfo.password}
                    onChange={handleLoginChange}
                    maxlength="20"
                    required
                  />
                </div>
                <p className="login-small-text">
                  當你使用FANTASKI | 代表你已同意<span>服務條款</span>與
                  <span>隱私權政策</span>
                </p>
                <div className="im-hr"></div>
                <div className="login-btn-area">
                  <button type="submit" className="btn-sumbit">
                    登入
                  </button>
                </div>
              </form>
            </div>
            {/* form-center-area end */}
          </div>

          {/* form-container sign-up-container end */}
          {/* 註冊 */}
          <div
            className={`form-container ${
              isContainerActive ? "log-in-container" : "log-up-container"
            }`}
          >
            <h2>註冊</h2>
            <div className="form-center-area">
              {/* 第三方連結(fb & google) */}
              <ThreePartyLink
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                fBloginState={fBloginState}
                setFbLoginState={setFbLoginState}
              />
              {/* three-party end */}
              <div className="login-or">
                <span>或</span>
              </div>
              <form className="form-sign-up" onSubmit={handleRegSubmit}>
                <div className="form-info">
                  <FaUser className="form-info-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="姓名:"
                    value={registerInfo.name}
                    onChange={handleRegisterChange}
                    minlength="4"
                    maxlength="20"
                    required
                  />
                </div>
                <div className="form-info">
                  <HiMail className="form-info-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="信箱:"
                    value={registerInfo.email}
                    onChange={handleRegisterChange}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    title="信箱不符合格式"
                    required
                  />
                </div>
                <div className="form-info">
                  <FaLock className="form-info-icon" />
                  {/* 密碼長度最多 20 最少 8 可自行調整但登入/註冊要統一*/}
                  <input
                    type="password"
                    name="password"
                    placeholder="密碼(限8-20碼小寫英文數字符號):"
                    value={registerInfo.password}
                    onChange={handleRegisterChange}
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"
                    title="請輸入最少一個英文字母，且總長度8~20碼"
                    minlength="8"
                    maxlength="20"
                    required
                  />
                </div>
                <div className="form-info">
                  <FaLock className="form-info-icon" />
                  {/* 密碼長度最多 20 最少 8 可自行調整但登入/註冊要統一*/}
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="再次輸入密碼:"
                    value={registerInfo.confirmPassword}
                    onChange={handleRegisterChange}
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"
                    minlength="8"
                    maxlength="20"
                    required
                  />
                  {/*  */}
                </div>
                {/* <Link className="sendmail-link">未收到驗證信</Link> */}
                <p className="login-small-text">
                  註冊即同意 | <span>服務條款</span>與<span>隱私權政策</span>
                </p>
                <div className="im-hr"></div>
                <div className="login-btn-area">
                  <button type="submit" className="btn-sumbit">
                    註冊
                  </button>
                </div>
              </form>
            </div>
            {/* form-center-area end */}
          </div>
          {/* form-container log-up-container end */}
          {/* 頁面切換  */}
          <OverImg signUpBtn={signUpBtn} signInBtn={signInBtn} />
        </div>
        {/* container login-container end */}
      </main>
    </>
  );
}

export default withRouter(Login);
