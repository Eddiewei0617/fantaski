import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FBlogin from "../login/FBLogin";

// icon
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function ThreePartyLink({ setUserInfo }) {
  const [clickOnFbLogin, setClickOnFbLogin] = useState(false);
  // google登入
  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:3001/auth/protected`, {
        withCredentials: true,
      });
      console.log("google", res);
    } catch (e) {
      console.error(e);
    }
  }, []);
  // async function loginByGoogle() {

  // }
  return (
    <>
      <div className="three-party">
        <a
          href="http://localhost:3001/auth/google"
          className="three-party-link"
        >
          {/* <Link to="" className="three-party-link"> */}
          <button className="googlebtn link-btn">
            <FcGoogle size={20} />
            <span>使用Google繼續</span>
          </button>
          {/* </Link> */}
        </a>
        <span
          className="three-party-link"
          onClick={() => {
            setClickOnFbLogin(true);
          }}
        >
          <button className="facebookbtn link-btn">
            {/* <FaFacebookF size={20} /> */}
            <span>使用Facebook繼續</span>
          </button>
        </span>
        {clickOnFbLogin && <FBlogin setUserInfo={setUserInfo} />}
      </div>
    </>
  );
}

export default ThreePartyLink;
