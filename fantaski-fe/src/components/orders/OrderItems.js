import { useState } from "react";
import { PRODUCTIMAGE_URL } from "../../config/url";

function OrderItems() {
  // 設定數量輸入值的狀態
  const [number, setNumber] = useState("");
  // 代入localStorage裡面存的資料
  var storage = localStorage;
  let itemString = storage["addItemList"];
  let items = itemString.substr(0, itemString.length - 2).split(", ");
  console.log("items", items);
  //   let value = storage.getItem("2");
  //   console.log("value", value);
  //   let valueName = value.split("|")[2];
  //   console.log("valueName", valueName);
  //   var getValue = JSON.parse(value);
  //   console.log("getValue", getValue);

  for (let i = 0; i < items.length; i++) {
    var orderArray = [
      {
        id: localStorage.getItem(items[i]),
        name: localStorage[items[i]].split("|")[2],
        category: localStorage[items[i]].split("|")[1],
        price: localStorage[items[i]].split("|")[3],
        image: localStorage[items[i]].split("|")[0],
      },
    ];
  }
  // console.log("check", orderArray[i].name);

  //   for (let i = 0; i < items.length; i++) {
  //     let itemInfo = storage.getItem(items[i]);
  //     console.log("totalValue", itemInfo);
  //     let itemTitle = itemInfo.split("|")[2];
  //     // createCartList(items[i], itemInfo);
  //   }

  // -------------------------------------------------------------------------------
  return (
    <>
      {orderArray.map((v, i) => {
        console.log("v", v);
        return (
          <div className="row " key={v.id}>
            <div className="cart_image">
              <img src={v.image} alt="" />
            </div>
            <div className="col">{v.category}</div>
            <div className="col">{v.name}</div>
            <div className="col">
              <input type="date" />
            </div>
            <div className="col">$ {v.price}</div>
            <div className="col">
              <input
                className="cart_number"
                type="number"
                value={number === "" ? 1 : number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                min="1"
              />
            </div>
            <div className="col">$ 1200</div>
            <div className="col" id="1">
              <button className="btn btn-info">X</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderItems;
