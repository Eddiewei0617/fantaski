import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import { API_URL } from "../../config/url";
import axios from "axios";

function FBLogin({ setUserInfo }) {
  const [login, setLogin] = useState(false);
  const [picture, setPicture] = useState("");
  const [data, setData] = useState({});

  const responseFacebook = async (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  useEffect(async () => {
    if (data !== {}) {
      try {
        let res = await axios.post(`${API_URL}/auth/fblogin`, data);
        setUserInfo(res.data.member);
        //抓看看seesion有沒有登入資料
        try {
          let resInfo = await axios.get(`${API_URL}/auth/userInfo`, {
            withCredentials: true,
          });
          console.log(resInfo.data);
        } catch (e) {
          console.log(e);
        }
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
            {!login && (
              <FacebookLogin
                appId="184724843853590"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {login && <Image src={picture} roundedCircle />}
          </Card.Header>
          {login && (
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
