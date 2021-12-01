import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// icon
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function ThreePartyLink() {
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
