import React, { useState, useEffect } from "react";

import HomeTitle from "./HomeTitle";
import HomeRentCarousel from "./HomeRent/HomeRentCarousel";

import { Button } from "react-bootstrap";
import { IMAGE_HOME_URL } from "../../config/url";

// 後端
import axios from "axios";
import { API_URL } from "../../config/url";

const types = ["雪板類", "服飾類", "裝備類"];

function HomeRent({ setColorButton }) {
  const mainTitle = {
    title: "租點裝備",
    subTitle: "你想不到的裝備這裡通通有",
  };

  //裝備按鈕選取

  const [active, setActive] = useState(types[0]);
  // console.log(types.indexOf(active));

  // 接後端api至頁面
  const [indexRent, setIndexRent] = useState([]);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/home/indexrent`);
    setIndexRent(res.data);
  }, []);
  let productList = [
    indexRent.filter((e) => e.type === types[0]),
    indexRent.filter((e) => e.type === types[1]),
    indexRent.filter((e) => e.type === types[2]),
  ];
  return (
    <>
      <div
        className="homerent-imgDotted"
        data-aos={"zoom-out-left"}
        data-aos-easing={"linear"}
        // data-aos-duration={"1500"}
        // data-aos-delay={"100"}
      >
        <img src={`${IMAGE_HOME_URL}/rent.png`} alt="rent" id="rentdot" />
      </div>
      <div
        className="homerent-imgDotted"
        data-aos={"zoom-out-left"}
        data-aos-easing={"linear"}
        data-aos-duration={"1500"}
        data-aos-delay={"300"}
      >
        <img
          src={`${IMAGE_HOME_URL}/green_tree.png`}
          alt="rent"
          id="greenrent"
        />
      </div>

      <section className="home-rent home-section">
        <div className="homerent-dree">
          <div className="container home-rent-bg">
            <HomeTitle title={mainTitle.title} subTitle={mainTitle.subTitle} />
            {/* home-title-area end */}
            <div className="home-rent-area">
              <div className="home-rent-button">
                {types.map((type) => (
                  <Button
                    key={type}
                    active={active === type}
                    onClick={() => setActive(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              {/* home-rent-button end */}

              <HomeRentCarousel
                active={active}
                productList={productList[types.indexOf(active)]}
                setColorButton={setColorButton}
              />
            </div>
          </div>
          {/* <img src={`${IMAGE_HOME_URL}/dree.png`} alt="rent" /> */}
        </div>
      </section>
    </>
  );
}

export default HomeRent;
