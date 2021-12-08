// 共用元件
import { useState, useEffect } from "react";
import { CART_CATEGORY } from "../../config/StatusShortcut";
import axios from "axios";
import { API_URL } from "../../config/url";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// 組合用元件
import OrderSubmitIcon from "./OrderSubmitIcon";
import PrevStepIcon from "./PrevStepIcon";
const moment = require("moment");

function OrderFinal({
  memberPoints,
  pointUsed,
  step,
  setStep,
  scrollToTop,
  progressAnimation,
  userInfo,
}) {
  // 代入localStorage裡面存的資料
  var storage = localStorage;
  let itemString = storage["addItemList"];
  let items = itemString.substr(0, itemString.length - 2).split(", ");
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    let orderArray = [];
    for (let i = 0; i < items.length; i++) {
      orderArray.push({
        id: items[i],
        name: localStorage[items[i]].split("|")[2],
        category: localStorage[items[i]].split("|")[1],
        price: localStorage[items[i]].split("|")[3],
        image: localStorage[items[i]].split("|")[0],
        date: localStorage[items[i]].split("|")[4],
        number: localStorage[items[i]].split("|")[5],
      });
    }
    setOrderList(orderArray);
  }, []);

  // 算總消費金額
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += storage[items[i]].split("|")[3] * storage[items[i]].split("|")[5];
  }

  // 把訂單編號存成useState比較好傳資料到後端
  const [orderNo, setOrderNo] = useState(0);
  useEffect(() => {
    setOrderNo(() => {
      let randomNo = random_No(2);
      return randomNo;
    });
  }, []);

  // 隨機生成訂單編號
  function random_No(j) {
    var random_no = "";
    for (
      var i = 0;
      i < j;
      i++ //j位隨機數，用以加在時間戳後面。
    ) {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
  }

  // 訂購時間(用moment套件)
  let orderTime = moment().format("YYYY-MM-DD hh:mm:ss a");
  async function handleSubmit(e) {
    // e.preventDefault();
    try {
      // 傳表單資料給後端
      let res = await axios.post(`${API_URL}/order/orderconfirm`, {
        orderList,
        orderNumber: orderNo,
        memberId: userInfo.id,
        total: total - pointUsed,
        totalWithoutPoint: total,
        pointUsed: pointUsed,
      });

      // 傳剩餘點數給後端
      let res2 = await axios.post(`${API_URL}/order/pointleft`, {
        pointLeft: memberPoints[0].point - pointUsed,
        memberId: userInfo.id,
        pointUsed,
        membersPoint: memberPoints[0].point,
      });
    } catch (e) {
      console.log("handleSubmit", e);
    }
  }
  // 表單出後清空localStorage資料並自動跳轉頁面回商品頁
  let history = useHistory();
  async function handleJupmto() {
    await storage.clear();
    let trans = await history.push("/products");
    Swal.fire({
      position: "top:100px",
      icon: "success",
      title: "感謝您的選購 祝您滑雪愉快",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // console.log("memberlist", memberPoints[0].point);
  console.log("pointUsed", pointUsed);
  return (
    <>
      <div
        className={`${
          progressAnimation === 3 && "slit-in-vertical"
        }  order_final_bg`}
      >
        <h2>確認訂單</h2>
        <div className="order_final_bg2">
          {/* 上方欄位 */}
          <div className="container">
            <div className="row mt-3 border-bottoms">
              <div className="col-3 final_title">
                <div>訂單編號</div>
              </div>
              <div className="col-9 final_word">{orderNo}</div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>訂購時間</div>
              </div>
              <div className="col-9 final_word" id="time">
                {orderTime}
              </div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>消費金額</div>
              </div>
              <div className="col-9 final_word">
                NT$ {pointUsed === undefined ? total : total - pointUsed}
              </div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>剩餘點數</div>
              </div>
              <div className="col-9 final_word">
                {pointUsed === 0
                  ? 0
                  : pointUsed === undefined
                  ? memberPoints[0].point
                  : memberPoints[0].point - pointUsed}
                {/* {pointUsed === undefined
                  ? memberPoints
                    ? userInfo.point
                    : userInfo.point - pointUsed
                  : userInfo.point - pointUsed} */}
                點
              </div>
            </div>
          </div>
          {/* 中間分隔線 */}
          <div className="middle_line"></div>

          {/* 下方總明細欄位 */}
          <form
            action=""
            className="final_form"
            onSubmit={(e) => {
              handleSubmit(e);
              handleJupmto();
            }}
          >
            <table className="final_table">
              <thead className="final_thead">
                <tr>
                  <th>種類</th>
                  <th>商品名稱</th>
                  <th>購買/租賃日期</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody className="final_tbody">
                {orderList.map((v, i) => {
                  let subtotal = v.price * v.number;
                  return (
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="category"
                          value={CART_CATEGORY[v.category]}
                        />
                      </td>
                      <td>
                        <input type="text" name="name" value={v.name} />
                      </td>
                      <td className="">
                        <input type="text" name="" value={v.date} />
                      </td>
                      <td className="type_number">
                        NT$ <input type="text" name="price" value={v.price} />
                      </td>
                      <td className="type_number">
                        <input type="text" name="amount" value={v.number} />
                      </td>
                      <td className="type_number">
                        NT$
                        <input type="text" name="subtotal" value={subtotal} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="final_total">
              <label>總計 : NT$ </label>
              <input
                type="text"
                name="total"
                value={pointUsed === undefined ? total : total - pointUsed}
              />
            </div>
            <div className="box3 d-flex justify-content-end m-4 final_prev">
              <PrevStepIcon
                step={step}
                setStep={setStep}
                scrollToTop={scrollToTop}
              />
              <OrderSubmitIcon />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderFinal;
