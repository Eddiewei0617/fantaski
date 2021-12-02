import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import { API_URL } from "../../config/url";
import axios from "axios";
import { useHistory } from "react-router-dom";

function FBLogin({
  setUserInfo,
  fBloginState,
  setFbLoginState,
  setClickOnFbLogin,
}) {
  const [picture, setPicture] = useState("");
  const [data, setData] = useState({});
  let history = useHistory();
  const responseFacebook = async (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setFbLoginState(true);
    } else {
      setFbLoginState(false);
    }
  };
  useEffect(async () => {
    if (data !== {}) {
      try {
        let res = await axios.post(`${API_URL}/auth/fblogin`, data, {
          withCredentials: true,
        });
        setUserInfo(res.data.member);
        history.push("/");
        setClickOnFbLogin(false);
      } catch (e) {
        console.log(e);
      }
    }
  }, [data]);

  return (
    <>
      <div class="container" className="d-none">
        <Card style={{ width: "600px" }}>
          <Card.Header>
            {!fBloginState && (
              <FacebookLogin
                appId="184724843853590"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {fBloginState && <Image src={picture} roundedCircle />}
          </Card.Header>
          {fBloginState && (
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.email}</Card.Text>
            </Card.Body>
          )}
        </Card>
      </div>
    </>
  );
}

export default FBLogin;
