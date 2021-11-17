import { useState, useEffect, useRef } from "react";
import { CART_CATEGORY } from "../../config/StatusShortcut";
import axios from "axios";
function OrderContent({
  customerChoose,
  setCustomerChoose,
  step,
  memberPoints,
  setMemberPoints,
  pointUsed,
  setPointUsed,
}) {
  // const [pointUsed, setPointUsed] = useState(0);
  const [points, setPoints] = useState("---");

  let storage = localStorage;
  let itemString = storage["addItemList"];
  let items = itemString.substr(0, itemString.length - 2).split(", ");

  // 計算下方裝備和課程總計的價格: 一進到頁面先計算渲染裝備和課程總計，然後如果數量有更動，再重新渲染一次
  const [productPrice, setProductPrice] = useState(0);
  const [coursePrice, setCoursePrice] = useState(0);

  useEffect(() => {
    let courseTotal = 0;
    for (let i = 0; i < items.length; i++) {
      let singlePrice = storage[items[i]].split("|")[3];
      let singleNumber = storage[items[i]].split("|")[5];
      courseTotal += singlePrice * singleNumber;
      if (storage[items[i]].split("|")[1] === "A") {
        setCoursePrice(courseTotal);
      }
    }
    let productTotal = 0;
    for (let j = 0; j < items.length; j++) {
      let singlePrice = storage[items[j]].split("|")[3];
      let singleNumber = storage[items[j]].split("|")[5];
      productTotal += singlePrice * singleNumber;
      if (storage[items[j]].split("|")[1] === "B") {
        setProductPrice(productTotal);
      }
    }
  }, [customerChoose]);

  useEffect(() => {
    if (memberPoints !== null) {
      setPointUsed(storage[`${memberPoints[0].name}`]);
    }
  }, [step]);

  return (
    <>
      <div className="order_content_bg">
        <h2>訂單內容</h2>
        <div className="order_content">
          {/* ---------明細欄位------------- */}
          <div className="container ">
            <div className="row order_detail">
              <div className="col-9">
                <div className="row row1">
                  <div className="col d-flex">
                    <label className="m-0">課程總計 NT$ </label>
                    <input type="text" value={coursePrice} className="p-0" />
                  </div>
                  <div className="col d-flex">
                    <label className="m-0">會員點數 </label>
                    <input type="text" value={`${points} 點`} className="p-0" />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        `${points}` === "---"
                          ? setPoints(`${memberPoints[0].point}`)
                          : setPoints(`---`);
                      }}
                    >
                      顯示會員點數
                    </button>
                  </div>
                </div>

                <div className="row row1">
                  <div className="col d-flex">
                    <label className="m-0">裝備總計 NT$ </label>
                    <input type="text" value={productPrice} className="p-0" />
                  </div>
                  <div className="col d-flex">
                    <label className="m-0">使用點數 </label>
                    <input
                      type="number"
                      placeholder={`${0}  點`}
                      value={pointUsed}
                      onChange={(e) => {
                        storage.setItem(memberPoints[0].name, pointUsed);
                        setPointUsed(e.target.value);
                      }}
                      className="p-0"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 order_total d-flex">
                <label className="m-0">總金額 NT$ </label>
                <input
                  type="text"
                  value={
                    pointUsed === undefined
                      ? coursePrice + productPrice
                      : coursePrice + productPrice - pointUsed
                  }
                  className="mr-4"
                />
              </div>
            </div>
          </div>
          {/* ---------明細欄位------------- */}
        </div>
      </div>
    </>
  );
}

export default OrderContent;
