import React, { useState } from "react";
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

function Login(props) {
  const { setUserInfo } = props;

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
    name: "jessie",
    email: "jessie@fantaski.com",
    password: "11241114",
    confirmPassword: "11241114",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "jessie@fantaski.com",
    password: "11241114",
  });

  //註冊呼叫api
  async function handleRegSubmit() {
    let res = await axios.post(`${API_URL}/auth/register`, registerInfo);
  }
  //登入呼叫api
  async function handleLoginSubmit() {
    try {
      let res = await axios.post(`${API_URL}/auth/login`, loginInfo, {
        withCredentials: true,
      });
      setUserInfo(res.data.member);
      props.history.goBack();
    } catch (e) {
      console.log(e);
    }
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
              <ThreePartyLink />
              {/* three-party end */}
              <div className="login-or">
                <span>或</span>
              </div>
              <form className="form-sign-up">
                <div className="form-info">
                  <FaUser className="form-info-icon" />
                  <input type="text" name="text" placeholder="帳號:" required />
                </div>
                <div className="form-info">
                  <FaLock className="form-info-icon" />
                  {/* 密碼長度最多 20 最少 8  可自行調整但登入/註冊要統一*/}
                  <input
                    type="password"
                    name="password"
                    placeholder="密碼:"
                    maxlength="20"
                    required
                  />
                </div>
              </form>
              <p className="login-small-text">
                當你使用FANTASKI | 代表你已同意<span>服務條款</span>與
                <span>隱私權政策</span>
              </p>
            </div>
            {/* form-center-area end */}
            <div className="im-hr"></div>
            <div className="login-btn-area">
              <button
                type="submit"
                onClick={handleLoginSubmit}
                className="btn-sumbit"
              >
                登入
              </button>
            </div>
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
              <ThreePartyLink />
              {/* three-party end */}
              <div className="login-or">
                <span>或</span>
              </div>
              <form className="form-sign-up">
                <div className="form-info">
                  <FaUser className="form-info-icon" />
                  <input
                    type="text"
                    name="text"
                    placeholder="帳號(限4-20碼小寫英文數字):"
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"
                    maxlength="20"
                    required
                  />
                </div>
                <div className="form-info">
                  <FaLock className="form-info-icon" />
                  {/* 密碼長度最多 20 最少 8 可自行調整但登入/註冊要統一*/}
                  <input
                    type="password"
                    name="password"
                    placeholder="再次輸入密碼:"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"
                    minlength="8"
                    maxlength="20"
                    required
                  />
                  {/*  */}
                </div>
              </form>
              <Link className="sendmail-link">未收到驗證信</Link>
              <p className="login-small-text">
                註冊即同意 | <span>服務條款</span>與<span>隱私權政策</span>
              </p>
            </div>
            {/* form-center-area end */}
            <div className="im-hr"></div>
            <div className="login-btn-area">
              <button
                type="submit"
                onClick={handleRegSubmit}
                className="btn-sumbit"
              >
                註冊
              </button>
            </div>
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

export default Login;
