import React, { useState, useEffect } from "react";
// import "../App.css";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { API_URL } from "../config/url";
import { withRouter } from "react-router-dom";
// import FBLogin from "../components/login/FBLogin";

function Login(props) {
  const { setUserInfo } = props;
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
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

  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0,
    // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500,
    // Register form sliding positions
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF", //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

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
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          className="login-button"
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          登入
        </animated.button>
        <animated.button
          className="login-button"
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          註冊
        </animated.button>
      </div>
      {/* <FBLogin /> */}
      <div onClick={handleRegSubmit}>註冊</div>
      <div onClick={handleLoginSubmit}>登入</div>

      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        {/* <a herf="#">忘記密碼了嗎?</a> */}
      </animated.div>
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      {/* <label for="username"></label> */}
      <input type="text" value="帳號:" id="username" />
      {/* <label for="password"></label> */}
      <input type="text" value="密碼" id="password" />
      <input type="submit" value="登入" className="submit" />
    </React.Fragment>
  );
}

function RegisterForm() {
  return (
    <React.Fragment>
      {/* <label for="fullname"></label> */}
      <input type="text" value="帳號:限(4-21碼小寫英文數字):" id="fullname" />
      {/* <label for="email"></label> */}
      <input type="text" value="信箱:" id="email" />
      {/* <label for="password"></label> */}
      <input type="text" value="密碼: 限(8-24碼英文數字符號):" id="password" />
      {/* <label for="confirmpassword"></label> */}
      <input type="text" value="再次輸入密碼: " id="confirmpassword" />
      <input type="submit" value="註冊" class="submit" />
    </React.Fragment>
  );
}

export default withRouter(Login);
