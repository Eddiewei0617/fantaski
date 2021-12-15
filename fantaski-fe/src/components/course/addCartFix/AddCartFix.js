import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calendar/Calendar";
import { COURSE_IMG_URL } from "../../../config/url";
import {
  getCourseInfo,
  handleAddNumber,
  getCourseInCarts,
  insertCartItems,
} from "../moduleList";
import Swal from "sweetalert2";

function AddCartFix({
  showCourse,
  customerChoose,
  setCustomerChoose,
  ifAddCart,
  setIfAddCart,
  setItemNumber,
  cartPositionState,
  userInfo,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  const FlyToCart = useRef();

  //檢查日期用
  var regDate = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  var regExp = new RegExp(regDate);

  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    if (name === "number" && newValue > customerChoose.courseLeft) {
      // alert("超過人數上限");
      Swal.fire("超過人數上限");
      return;
    } else if (name === "number" && newValue <= 0) {
      // alert("人數不可少於1");
      Swal.fire("人數不可少於1");
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

  useEffect(async () => {
    // if (courseInfo !== null && storage[`c-${courseInfo[0].id}`]) {
    //   setIfAddCart(true);
    //   //如果課程已加入購物車，萬年曆人數要減相應人數
    //   let addCartDate = storage[`c-${courseInfo[0].id}`].split("|")[4];
    //   let addCartAmount = storage[`c-${courseInfo[0].id}`].split("|")[5];
    //   setCustomerChoose((cur) => {
    //     return {
    //       ...cur,
    //       addCartDate: addCartDate,
    //       addCartAmount: addCartAmount,
    //     };
    //   });
    // }
    if (courseInfo !== null && userInfo !== null) {
      if (userInfo.id) {
        getCourseInCarts(
          courseInfo[0].id,
          userInfo.id,
          setIfAddCart,
          setCustomerChoose
        );
      } else {
        await getCourseInCarts(
          courseInfo[0].id,
          0,
          setIfAddCart,
          setCustomerChoose
        );
        if (courseInfo !== null && storage[`c-${courseInfo[0].id}`]) {
          setIfAddCart(true);
          //如果課程已加入購物車，萬年曆人數要減相應人數
          let addCartDate = storage[`c-${courseInfo[0].id}`].split("|")[4];
          let addCartAmount = storage[`c-${courseInfo[0].id}`].split("|")[5];
          setCustomerChoose((cur) => {
            return {
              ...cur,
              addCartDate: addCartDate,
              addCartAmount: addCartAmount,
            };
          });
        }
      }
    }
  }, [courseInfo, userInfo]);

  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }

  function handleFlyToCart(e) {
    FlyToCart.current.style.top = `${
      e.clientY - FlyToCart.current.clientHeight / 2
    }px`;
    FlyToCart.current.style.left = `${
      e.clientX - FlyToCart.current.clientWidth / 2
    }px`;
    let cartX =
      cartPositionState.current.offsetLeft +
      cartPositionState.current.clientWidth / 2;
    let cartY =
      cartPositionState.current.offsetTop +
      cartPositionState.current.clientHeight / 2;
    setTimeout(() => {
      FlyToCart.current.style.top = `${cartY}px`;
      FlyToCart.current.style.left = `${cartX}px`;
      FlyToCart.current.style.width = "10px";
      FlyToCart.current.style.height = "10px";
      FlyToCart.current.style.opacity = "0";
    }, 0);
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
      <div className="fly-to-cart" ref={FlyToCart}></div>
      <div className="add-cart-fix-wrapper">
        <div className="decoration-skill">
          <img
            className="object-fit"
            src={`${COURSE_IMG_URL}/skillPeople.png`}
            alt=""
          />
        </div>
        <div className="row text-center content">
          <div className="col-md-2 d-sm-none"></div>
          <div className="col-md-2 col-sm-4 day-choose-box justify-content-end ">
            <h5>請選擇日期</h5>
            <input
              type="text"
              name="date"
              value={customerChoose.date}
              placeholder={
                customerChoose.addCartDate && courseInfo !== null
                  ? customerChoose.addCartDate
                  : "選擇日期"
              }
              className={`date pl-4 ${ifAddCart && "text-secondary"}`}
              onChange={(e) => {
                if (ifAddCart) {
                  Swal.fire("已加入購物車，請至購物車修改");
                } else {
                  handleChange(e);
                }
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
                  ifAddCart={ifAddCart}
                  userInfo={userInfo}
                  setIfAddCart={setIfAddCart}
                />
              </div>
            )}
          </div>
          <div className="col-md-2 col-sm-3 number-choose-box">
            <h5>報名人數</h5>
            <input
              type="number"
              name="number"
              value={customerChoose.number}
              placeholder={
                customerChoose.addCartAmount && courseInfo !== null
                  ? customerChoose.addCartAmount
                  : 1
              }
              min="1"
              max={
                customerChoose.courseLeft === undefined
                  ? customerChoose.courseLimit
                  : customerChoose.courseLeft
              }
              className={`number ${ifAddCart && "text-secondary"}`}
              onChange={(e) => {
                if (ifAddCart) {
                  Swal.fire("已加入購物車，請至購物車修改");
                } else {
                  handleChange(e);
                }
              }}
            ></input>
          </div>
          <div className="col-md-2 col-sm-3 ">
            <h5>價格</h5>
            <h4>
              {courseInfo === null
                ? "價錢查詢中：）"
                : `$${courseInfo[0].price * customerChoose.number}`}
            </h4>
          </div>
          <div className="col-md-2">
            <button
              className={ifAddCart ? "button-clicked" : ""}
              onClick={(e) => {
                let itemId = `c-${courseInfo[0].id}`;
                if (ifAddCart) {
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
                  handleFlyToCart(e);
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
                  console.log(addCartDate);
                  setCustomerChoose((cur) => {
                    return {
                      ...cur,
                      addCartDate: addCartDate,
                      addCartAmount: addCartAmount,
                    };
                  });
                  if (courseInfo !== null && userInfo !== null) {
                    if (userInfo.id) {
                      let itemArr = [
                        {
                          memberId: userInfo.id,
                          items: {
                            courseDate: customerChoose.date,
                            courseAmount: customerChoose.number,
                          },
                        },
                      ];
                      insertCartItems(userInfo.id, courseInfo[0].id, itemArr);
                    } else {
                      let itemArr = [
                        {
                          memberId: 0,
                          items: {
                            courseDate: customerChoose.date,
                            courseAmount: customerChoose.number,
                          },
                        },
                      ];
                      insertCartItems(0, courseInfo[0].id, itemArr);
                    }
                  }
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
          <div className="col-md-2 d-sm-none"></div>
        </div>
      </div>
    </>
  );
}

export default AddCartFix;
