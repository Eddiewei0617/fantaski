import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar/Calendar";
import { COURSE_IMG_URL } from "../../../config/url";
import { getCourseInfo } from "../moduleList";

function AddCartFloat({ customerChoose, setCustomerChoose, showCourse }) {
  const [showCalendarFloat, setShowCalendarFloat] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    getCourseInfo(showCourse, setCourseInfo);
    window.addEventListener("click", () => {
      setShowCalendarFloat(false);
    });
  }, []);

  if (courseInfo === null) {
    return (
      <>
        <div></div>
      </>
    );
  }
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
              src={`${COURSE_IMG_URL}/${courseInfo[0].img}`}
              alt=""
            />
          </div>
          <div className="add-cart-box-info">
            <div>課程名稱：{courseInfo[0].name}</div>
            <div>課程時數：{courseInfo[0].hours}小時</div>
            <div className="add-cart-box-info-date">
              報名日期：
              <FontAwesomeIcon
                className="icons"
                icon={faCalendarAlt}
                onClick={(e) => {
                  e.stopPropagation();
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
            <div>課程價錢：$ {courseInfo[0].price}</div>
          </div>
          <button>立即報名</button>
        </div>
      </div>
    </>
  );
}

export default AddCartFloat;
