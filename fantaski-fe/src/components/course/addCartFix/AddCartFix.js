import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar";

function AddCartFix() {
  const [customerChoose, setCustomerChoose] = useState({
    date: "",
    number: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    setCustomerChoose((cur) => {
      return { ...cur, [name]: newValue };
    });
    console.log(name, newValue);
  }
  return (
    <>
      <div className="add-cart-fix-wrapper">
        <div className="row text-center content">
          <div className="col-2"></div>
          <div className="col-2 day-choose-box">
            <h5>請選擇日期</h5>
            <input
              type="text"
              name="date"
              value={customerChoose.date}
              placeholder="yyyy-mm-dd"
              className="date"
              onChange={handleChange}
            ></input>
            <FontAwesomeIcon
              className="icons calendar-icon"
              icon={faCalendarAlt}
              onClick={() => {
                setShowCalendar(!showCalendar);
              }}
            />
            {showCalendar && (
              <div className="custom-calendar">
                <Calendar />
              </div>
            )}
          </div>
          <div className="col-2 number-choose-box">
            <h5>報名人數</h5>
            <input
              type="number"
              name="number"
              value={customerChoose.number}
              placeholder="1"
              className="number"
              onChange={handleChange}
            ></input>
            <FontAwesomeIcon className="icons number-icon" icon={faSortUp} />
            <FontAwesomeIcon className="icons number-icon" icon={faSortDown} />
          </div>
          <div className="col-2">
            <h5>價格</h5>
            <h4>$3000</h4>
          </div>
          <div className="col-2">
            <button>立即報名</button>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default AddCartFix;
