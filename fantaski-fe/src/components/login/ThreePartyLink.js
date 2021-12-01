import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// import { GOOGLE_CLIENT_ID } from "../../config/url";
import { API_URL } from "../../config/url";

// icon
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function ThreePartyLink() {
  // google登入
  // useEffect(async () => {
  //   try {
  //     let res = await axios.get(`http://localhost:3001/auth/protected`, {
  //       withCredentials: true,
  //     });
  //     console.log("google", res);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);
  // async function loginByGoogle() {
  //   try {
  //     let res = await axios.get(`http://localhost:3001/auth/google`, {
  //       withCredentials: true,
  //     });
  //     console.log("google", res);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // function responseGoogle(response) {
  //   console.log("response", response);
  // }

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      let { profileObj } = response;
      let res = await axios.post(`${API_URL}/auth/google`, {
        profileObj,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="three-party">
        {/* <a
          href="http://localhost:3001/auth/google"
          className="three-party-link"
        > */}
        <GoogleLogin
          clientId="560182662288-n0636314scmffmi33c6dkc4o5453cd25.apps.googleusercontent.com"
          buttonText="使用 Google 帳戶繼續"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              className="three-party-link"
              onClick={renderProps.onClick}
              //disabled={renderProps.disabled}
            >
              <FcGoogle size={20} />
              <span>使用Google繼續</span>
            </button>
          )}
        />
        {/* <Link to="" className="three-party-link"> */}
        {/* <button className="googlebtn link-btn three-party-link">
          <FcGoogle size={20} />
          <span>使用Google繼續</span>
        </button> */}
        {/* </Link> */}
        {/* </a> */}
        <Link to="" className="three-party-link">
          <button className="facebookbtn link-btn">
            <FaFacebookF size={20} />
            <span>使用Facebook繼續</span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default ThreePartyLink;
