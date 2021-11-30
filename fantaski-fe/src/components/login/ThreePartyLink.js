import React from "react";
import { Link } from "react-router-dom";

// icon
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function ThreePartyLink() {
  return (
    <>
      <div className="three-party">
        <Link to="" className="three-party-link">
          <button className="googlebtn link-btn">
            <FcGoogle size={20} />
            <span>使用Google繼續</span>
          </button>
        </Link>
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
