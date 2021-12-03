import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function OrderContent({
  customerChoose,
  step,
  memberPoints,
  pointUsed,
  setPointUsed,
  itemNumber,
  setMemberNumber,
  userInfo,
}) {
  const [points, setPoints] = useState("---");

  let storage = localStorage;
  let itemString = storage["addItemList"];
  let items = itemString.substr(0, itemString.length - 2).split(", ");

  // 計算下方裝備和課程總計的價格: 一進到頁面先計算渲染裝備和課程總計，然後如果數量有更動，再重新渲染一次
  const [productPrice, setProductPrice] = useState(0);
  const [coursePrice, setCoursePrice] = useState(0);

  useEffect(() => {
    if (itemNumber !== 0) {
      let courseTotal = 0;
      for (let i = 0; i < items.length; i++) {
        let singlePrice = storage[items[i]].split("|")[3];
        let singleNumber = storage[items[i]].split("|")[5];
        if (storage[items[i]].split("|")[1] === "A") {
          courseTotal += singlePrice * singleNumber;
        }
      }
      setCoursePrice(courseTotal);

      let productTotal = 0;
      for (let j = 0; j < items.length; j++) {
        let singlePrice = storage[items[j]].split("|")[3];
        let singleNumber = storage[items[j]].split("|")[5];
        if (storage[items[j]].split("|")[1] === "B") {
          productTotal += singlePrice * singleNumber;
        }
      }
      setProductPrice(productTotal);
    }
  }, [customerChoose, itemNumber]);

  // 希望換到不同階段時，下方使用點數還繼續顯示著
  useEffect(() => {
    if (memberPoints === null || !!storage[`${memberPoints}`]) {
      setPointUsed(0);
    } else {
      setPointUsed(storage[`${memberPoints[0].name}`]);
    }
  }, [step]);
  // console.log("564", !!storage[`${memberPoints}`]);

  // 非會員進入購物車時，不能顯示會員點數，也不能使用點數
  useEffect(() => {
    if (memberPoints === null) {
      setPoints(`---`);
      // console.log("test", memberPoints);
    }
  }, []);

  // 因為非同步的關係，第一次接收到的memberPoints是null，所以要設一個判斷式，判斷現在是不是null
  // 且如果這兩個條件同時符合才會進到這個判斷式裡面 (因為userInfo 和 memberpoints 會抓兩次，第一次是null 第二次是{code:1201, xxxx})
  useEffect(() => {
    if (memberPoints !== null && userInfo.code !== 1201) {
      points === "---"
        ? setPoints(memberPoints ? memberPoints[0].point : "---")
        : setPoints(`---`);
      // console.log("test2", memberPoints);
    }
  }, [memberPoints]);
  // console.log("pointUsed", pointUsed); // 一進來，沒有onChange會是 undefined

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
                        if (userInfo && userInfo.code === 1201) {
                          setPoints("請先登入");
                        } else {
                          setMemberNumber(Math.random());
                        }
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
                      value={
                        userInfo && userInfo.code === 1201
                          ? "請先登入"
                          : pointUsed === undefined
                          ? 0
                          : pointUsed
                      }
                      onChange={(e) => {
                        if (e.target.value > userInfo.point) {
                          Swal.fire("不可使用超過擁有點數");
                          return;
                        }
                        if (memberPoints !== null) {
                          storage.setItem(
                            memberPoints ? memberPoints[0].name : 0,
                            e.target.value
                          );
                          setPointUsed(e.target.value);
                        } else {
                          setPointUsed(0);
                        }
                      }}
                      className="p-0 point_used"
                      min="0"
                      max={
                        userInfo === null || userInfo.code === 1201
                          ? 0
                          : userInfo.point
                      }
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
