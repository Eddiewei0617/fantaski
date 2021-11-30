import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar/Calendar";
import { COURSE_IMG_URL } from "../../../config/url";
import { getCourseInfo, handleAddNumber } from "../moduleList";

function AddCartFix({
  showCourse,
  customerChoose,
  setCustomerChoose,
  ifAddCart,
  setIfAddCart,
  setItemNumber,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  //檢查日期用
  var regDate = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  var regExp = new RegExp(regDate);

  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    if (name === "number" && newValue > customerChoose.courseLeft) {
      alert("超過人數上限");
      return;
    } else if (name === "number" && newValue <= 0) {
      alert("人數不可少於1");
      return;
    }
    setCustomerChoose((cur) => {
      return { ...cur, [name]: newValue };
    });
  }
  useEffect(() => {
    getCourseInfo(showCourse, setCourseInfo);
    window.addEventListener("click", () => {
      setShowCalendar(false);
    });
  }, []);

  useEffect(() => {
    if (courseInfo !== null && storage[`c-${courseInfo[0].id}`]) {
      setIfAddCart(true);
      //如果課程已加入購物車，萬年曆人數要減相應人數
      let addCartDate = storage[`c-${courseInfo[0].id}`].split("|")[4];
      let addCartAmount = storage[`c-${courseInfo[0].id}`].split("|")[5];
      console.log(addCartDate, addCartAmount);
      setCustomerChoose((cur) => {
        return {
          ...cur,
          addCartDate: addCartDate,
          addCartAmount: addCartAmount,
        };
      });
    }
  }, [courseInfo]);

  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }

  if (courseInfo === null) {
    return (
      <>
        <div></div>
      </>
    );
  }

  return (
    <>
      <div className="add-cart-fix-wrapper">
        <div className="decoration-skill">
          <img
            className="object-fit"
            src={`${COURSE_IMG_URL}/skillPeople.png`}
            alt=""
          />
        </div>
        <div className="row text-center content">
          <div className="col-2"></div>
          <div className="col-2 day-choose-box justify-content-end ">
            <h5>請選擇日期</h5>
            <input
              type="text"
              name="date"
              value={customerChoose.date}
              placeholder={
                storage[`c-${courseInfo[0].id}`] && courseInfo !== null
                  ? storage[`c-${courseInfo[0].id}`].split("|")[4]
                  : "選擇日期"
              }
              className="date pl-4"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <FontAwesomeIcon
              className="icons"
              icon={faCalendarAlt}
              onClick={(e) => {
                e.stopPropagation();
                setShowCalendar(!showCalendar);
              }}
            />
            {showCalendar && (
              <div className="custom-calendar">
                <Calendar
                  showCourse={showCourse}
                  customerChoose={customerChoose}
                  setCustomerChoose={setCustomerChoose}
                  setShowCalendar={setShowCalendar}
                />
              </div>
            )}
          </div>
          <div className="col-2 number-choose-box">
            <h5>報名人數</h5>
            <input
              type="number"
              name="number"
              value={customerChoose.number}
              placeholder={
                storage[`c-${courseInfo[0].id}`] && courseInfo !== null
                  ? storage[`c-${courseInfo[0].id}`].split("|")[5]
                  : 1
              }
              min="1"
              max={
                customerChoose.courseLeft === undefined
                  ? customerChoose.courseLimit
                  : customerChoose.courseLeft
              }
              className="number"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-2">
            <h5>價格</h5>
            <h4>
              {courseInfo === null
                ? "價錢查詢中：）"
                : `$${courseInfo[0].price * customerChoose.number}`}
            </h4>
          </div>
          <div className="col-2">
            <button
              className={ifAddCart ? "button-clicked" : ""}
              onClick={(e) => {
                let itemId = `c-${courseInfo[0].id}`;
                if (storage[itemId]) {
                  alert("您已將此物品加入購物車");
                } else if (customerChoose.date === "") {
                  alert("請填寫日期！");
                } else if (customerChoose.number > customerChoose.courseLeft) {
                  alert("人數超過上限");
                } else if (!regExp.test(customerChoose.date)) {
                  alert("日期格式不正確，正確格式為：YYYY-MM-DD");
                  return;
                } else {
                  setIfAddCart(true);
                  let productInfo = e.currentTarget.children[0].value;
                  // console.log("value", productInfo); //http://localhost:3000/assets/images_product/allblack.jfif|雪板類|暗黑滿點單板|1200

                  // 開始把點"加到購物車"的商品存入storage

                  storage.setItem(itemId, productInfo);
                  storage["addItemList"] += `${itemId}, `;
                  handleAddNumber(storage, setItemNumber);
                  //如果課程已加入購物車，萬年曆人數要減相應人數
                  let addCartDate =
                    storage[`c-${courseInfo[0].id}`].split("|")[4];
                  let addCartAmount =
                    storage[`c-${courseInfo[0].id}`].split("|")[5];
                  setCustomerChoose((cur) => {
                    return {
                      ...cur,
                      addCartDate: addCartDate,
                      addCartAmount: addCartAmount,
                    };
                  });
                }
              }}
            >
              {ifAddCart ? "成功報名" : "立即報名"}
              <input
                type="hidden"
                value={`${COURSE_IMG_URL}/${courseInfo[0].img}|A|${courseInfo[0].name}課程|${courseInfo[0].price}|${customerChoose.date}|${customerChoose.number}`}
              />
            </button>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default AddCartFix;
