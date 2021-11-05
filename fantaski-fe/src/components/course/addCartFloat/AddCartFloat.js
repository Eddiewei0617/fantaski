import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar/Calendar";

function AddCartFloat({ customerChoose, setCustomerChoose, showCourse }) {
  const [showCalendarFloat, setShowCalendarFloat] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);
  const courseInfoList = [
    {
      name: "初體驗",
      hours: 4,
      price: 1500,
      imgSrc: "couch3.jpeg",
    },

    {
      name: "技能班",
      hours: 6,
      price: 3000,
      imgSrc: "skill7.jpeg",
    },

    {
      name: "雪橇車",
      hours: 3,
      price: 3000,
      imgSrc: "sled1.jpeg",
    },
    {
      name: "建冰屋",
      hours: 2,
      price: 1000,
      imgSrc: "igloo3.jpeg",
    },
  ];
  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    setCustomerChoose((cur) => {
      return { ...cur, [name]: newValue };
    });
  }
  function handleClickAddCart() {
    setShowAddCart(!showAddCart);
  }
  //依據回傳的showCourse return相應資訊
  let infoToSHow = courseInfoList.filter((item) => {
    return item.name === showCourse;
  });
  console.log(infoToSHow);
  return (
    <>
      <div
        className={`add-cart-float-wrapper d-flex ${
          showAddCart && "add-cart-float-wrapper-show"
        }`}
      >
        <div className="hover-to-show" onClick={handleClickAddCart}>
          {showAddCart ? (
            <FontAwesomeIcon className="my-2" icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon className="my-2" icon={faChevronLeft} />
          )}
          立即報名
        </div>
        <div className="add-cart-box">
          <div className="add-cart-box-img">
            <img
              className="object-fit"
              src={`/assets/img_course/${infoToSHow[0].imgSrc}`}
              alt=""
            />
          </div>
          <div className="add-cart-box-info">
            <div>課程名稱：{infoToSHow[0].name}</div>
            <div>課程時數：{infoToSHow[0].hours}小時</div>
            <div className="add-cart-box-info-date">
              報名日期：
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarAlt}
                onClick={() => {
                  setShowCalendarFloat(!showCalendarFloat);
                }}
              />
              <input
                type="text"
                name="date"
                value={customerChoose.date}
                placeholder="選擇日期"
                className="date-input pl-3"
                onChange={handleChange}
              ></input>
              {showCalendarFloat && (
                <div className="custom-calendar">
                  <Calendar
                    customerChoose={customerChoose}
                    setCustomerChoose={setCustomerChoose}
                    showCalendarFloat={showCalendarFloat}
                    setShowCalendarFloat={setShowCalendarFloat}
                  />
                </div>
              )}
            </div>
            <div>
              報名人數：
              <input
                type="number"
                name="number"
                value={customerChoose.number}
                placeholder="1"
                min="1"
                className="number-input"
                onChange={handleChange}
              ></input>
            </div>
            <div>課程價錢：$ {infoToSHow[0].price}</div>
          </div>
          <button>立即報名</button>
        </div>
      </div>
    </>
  );
}

export default AddCartFloat;
