import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import FBlogin from "../login/FBLogin";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../config/url";
import { API_URL } from "../../config/url";
import Swal from "sweetalert2";

// icon
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function ThreePartyLink(props) {
  const { setUserInfo, userInfo, fBloginState, setFbLoginState } = props;
  const [clickOnFbLogin, setClickOnFbLogin] = useState(false);
  let history = useHistory();
  // google登入
  const [data, setData] = useState(null);
  const responseGoogle = async (response) => {
    console.log("response,", response);
    console.log("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID);
    setData(response);
  };
  useEffect(async () => {
    if (data !== null) {
      try {
        // let { profileObj } = response;
        let res = await axios.post(
          `${API_URL}/auth/google`,
          {
            profileObj: data.profileObj,
          },
          { withCredentials: true }
        );
        history.push("/");
        Swal.fire("Login", "登入成功", "success");
        // console.log("res.data.member", res.data.member);
        setUserInfo(res.data.member);
        console.log("userInfo", userInfo);
      } catch (e) {
        console.error(e);
      }
    }
  }, [data]);

  // useEffect(async () => {
  //   console.log("userInfo", userInfo);
  //   // let returns = await history.push("/");
  // }, [userInfo]);

  return (
    <>
      <div className="three-party">
        {/* <a
          href="http://localhost:3001/auth/google"
          className="three-party-link"
> */}
        <div className="three-party-link">
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="使用 Google 帳戶繼續"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                className="googlebtn link-btn"
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                <FcGoogle size={20} />
                <span>使用Google繼續</span>
              </button>
            )}
          />
        </div>
        {/* <Link to="" className="three-party-link"> */}
        {/* <button className="googlebtn link-btn three-party-link">
          <FcGoogle size={20} />
          <span>使用Google繼續</span>
        </button> */}
        {/* </Link> */}
        {/* </a> */}

        <div
          className="three-party-link"
          onClick={() => {
            setClickOnFbLogin(true);
          }}
        >
          <button className="facebookbtn link-btn">
            <FaFacebookF size={20} />
            <span>使用Facebook繼續</span>
          </button>
        </div>
        {clickOnFbLogin && (
          <FBlogin
            setUserInfo={setUserInfo}
            fBloginState={fBloginState}
            setFbLoginState={setFbLoginState}
            setClickOnFbLogin={setClickOnFbLogin}
          />
        )}
      </div>
    </>
  );
}

export default ThreePartyLink;
