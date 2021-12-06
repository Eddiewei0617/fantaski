import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar/Calendar";
import { COURSE_IMG_URL } from "../../../config/url";
import { getCourseInfo, handleAddNumber } from "../moduleList";
import Swal from "sweetalert2";

function AddCartFloat({
  customerChoose,
  setCustomerChoose,
  showCourse,
  ifAddCart,
  setIfAddCart,
  setItemNumber,
}) {
  const [showCalendarFloat, setShowCalendarFloat] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  //檢查日期用
  var regDate = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  var regExp = new RegExp(regDate);

  useEffect(() => {
    getCourseInfo(showCourse, setCourseInfo);
    window.addEventListener("click", () => {
      setShowCalendarFloat(false);
    });
  }, []);

  useEffect(() => {
    if (courseInfo !== null && storage[`c-${courseInfo[0].id}`]) {
      setIfAddCart(true);
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
  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    if (name === "number" && newValue > customerChoose.courseLeft) {
      Swal.fire("超過人數上限");
      return;
    } else if (name === "number" && newValue <= 0) {
      Swal.fire("人數不可少於1");
      return;
    }
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
          <span className="d-md-inline d-sm-none">立即報名</span>
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
                placeholder={
                  storage[`c-${courseInfo[0].id}`] && courseInfo !== null
                    ? storage[`c-${courseInfo[0].id}`].split("|")[4]
                    : "選擇日期"
                }
                className={`date-input pl-3 ${ifAddCart && "text-secondary"}`}
                onChange={(e) => {
                  if (ifAddCart) {
                    Swal.fire("已加入購物車，請至購物車修改");
                  } else {
                    handleChange(e);
                  }
                }}
              ></input>
              {showCalendarFloat && (
                <div className="custom-calendar">
                  <Calendar
                    showCourse={showCourse}
                    customerChoose={customerChoose}
                    setCustomerChoose={setCustomerChoose}
                    showCalendarFloat={showCalendarFloat}
                    setShowCalendarFloat={setShowCalendarFloat}
                    ifAddCart={ifAddCart}
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
                placeholder={
                  storage[`c-${courseInfo[0].id}`] && courseInfo !== null
                    ? storage[`c-${courseInfo[0].id}`].split("|")[4]
                    : "選擇日期"
                }
                min="1"
                max={
                  customerChoose.courseLeft === undefined
                    ? customerChoose.courseLimit
                    : customerChoose.courseLeft
                }
                className={`number-input ${ifAddCart && "text-secondary"}`}
                onChange={(e) => {
                  if (ifAddCart) {
                    Swal.fire("已加入購物車，請至購物車修改");
                  } else {
                    handleChange(e);
                  }
                }}
              ></input>
            </div>
            <div>課程價錢：$ {courseInfo[0].price * customerChoose.number}</div>
          </div>
          <button
            onClick={(e) => {
              let itemId = `c-${courseInfo[0].id}`;
              if (storage[itemId]) {
                // alert("您已將此物品加入購物車");
                Swal.fire("您已將此物品加入購物車");
              } else if (customerChoose.date === "") {
                // alert("請填寫日期！");
                Swal.fire("請填寫日期！");
              } else if (customerChoose.number > customerChoose.courseLeft) {
                // alert("人數超過上限");
                Swal.fire("人數超過上限");
              } else if (!regExp.test(customerChoose.date)) {
                // alert("日期格式不正確，正確格式為：YYYY-MM-DD");
                Swal.fire("日期格式不正確，正確格式為：YYYY-MM-DD");
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
            className={ifAddCart ? "button-clicked" : ""}
          >
            {ifAddCart ? "成功報名" : "立即報名"}
            <input
              type="hidden"
              value={`${COURSE_IMG_URL}/${courseInfo[0].img}|A|${courseInfo[0].name}課程|${courseInfo[0].price}|${customerChoose.date}|${customerChoose.number}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCartFloat;
