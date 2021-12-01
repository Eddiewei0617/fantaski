import React from "react";
import { IMAGE_SHARE_URL } from "../../config/url";

function OverImg({ signUpBtn, signInBtn }) {
  //   console.log(signUpBtn);
  return (
    <>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <img
              src={`${IMAGE_SHARE_URL}/fantaski_logo_white.svg`}
              width="200"
              height="200"
              alt="FantaskiLogo"
            />
            <button className="ghost" id="signIn" onClick={signUpBtn}>
              登入
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <img
              src={`${IMAGE_SHARE_URL}/fantaski_logo_white.svg`}
              width="200"
              height="200"
              alt="FantaskiLogo"
            />
            <button className="ghost" id="signUp" onClick={signInBtn}>
              註冊
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverImg;
