import { useEffect, useState } from "react";
import { CART_CATEGORY } from "../../config/StatusShortcut";
import moment from "moment";
function OrderItems({
  customerChoose,
  setCustomerChoose,
  setItemNumber,
  itemNumber,
}) {
  // 設定數量輸入值的狀態

  // 代入localStorage裡面存的資料
  var storage = localStorage;
  let itemString = storage["addItemList"];
  let items = itemString.substr(0, itemString.length - 2).split(", ");
  // console.log("items", items);

  // 將在購物車要呈現的資料push進一個空陣列，並且當customerChoose(date或number)有變動時，再重新渲染一次 ---------------------
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
  }, [customerChoose]);
  //-------------------------------------------------------------------------------------------------------------

  // 寫一個function過濾出剩下沒被點到刪除的商品們
  function removeFromCart(itemToRemove) {
    setOrderList((orderList) =>
      orderList.filter((v, i) => {
        return v.id !== itemToRemove;
      })
    );
  }
  // -------------------------------------------------------------------------------
  const today = moment().format("YYYY-MM-DD");

  return (
    <>
      {orderList.map((v, i) => {
        return (
          <div className="row " key={v.id}>
            <div className="cart_image">
              <img src={v.image} alt="" />
            </div>
            <div className="col">{CART_CATEGORY[v.category]}</div>
            <div className="col">{v.name}</div>
            <div className="col">
              <input
                type="date"
                name="date"
                value={v.date}
                onChange={(e) => {
                  setCustomerChoose((cur) => {
                    return { ...cur, [e.target.name]: productDate };
                  });
                  // 抓日期變換的值
                  let productDate = e.target.value;
                  // 將storage裡面的字串value轉成陣列
                  let newDateArray = storage[`${v.id}`].split("|");
                  // 將日期位置以最新日期取代。splice(欲取代的位置index, 取一個, 以甚麼東西取代它)
                  newDateArray.splice(4, 1, productDate);
                  // 最後再將改好的陣列轉回字串放回localStorage
                  storage[`${v.id}`] = newDateArray.join("|");
                }}
                min={today}
              />
            </div>
            <div className="col">$ {v.price}</div>
            <div className="col">
              <input
                className="cart_number"
                type="number"
                name="number"
                value={v.number === "" ? 1 : v.number}
                onChange={(e) => {
                  setCustomerChoose((cur) => {
                    return { ...cur, [e.target.name]: e.target.value };
                  });
                  let productNumber = e.target.value;
                  let newNumberArray = storage[`${v.id}`].split("|");
                  newNumberArray.splice(5, 1, productNumber);
                  storage[`${v.id}`] = newNumberArray.join("|");
                }}
                min="1"
              />
            </div>
            <div className="col">
              {v.number !== "" ? v.number * v.price : 1 * v.price}
            </div>
            <div className="col" id="1">
              <button
                className="btn btn-info"
                onClick={() => {
                  // 讓頁面上的商品消失:
                  removeFromCart(`${v.id}`);
                  // 讓localStorage的資料消失:
                  delete localStorage[`${v.id}`];
                  // 讓localStorage的數量少了被刪除的那個id
                  storage["addItemList"] = storage["addItemList"].replace(
                    `${v.id}, `,
                    ""
                  );
                  setItemNumber(itemNumber - 1);
                }}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderItems;
