// 內建通用型元件
import { useState, useEffect, useRef } from "react";

// 手風琴不同種類商品的components切換
import ProductInfo from "./ProductInfo";

function ProductSquare({
  clickToChangeToggle,
  toggleState,
  setItemNumber,
  categoryId,
}) {
  // 點加入購物車後從到locaStorage
  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
  }
  // 抓到storage裡面有幾樣商品的字串後，用split將字串轉成陣列就能顯示出有幾個了
  function handleAddNumber() {
    let itemString = storage["addItemList"];
    let items = itemString.substr(0, itemString.length - 2).split(", ");
    setItemNumber(Number(items.length));
  }
  // 一進到頁面(包括重新整理)，判判斷如果addItemList裡面是空字串，就設購物車數字為0，不然就正常呼叫函式
  useEffect(() => {
    if (storage["addItemList"] === "") {
      setItemNumber(0);
    } else {
      handleAddNumber();
    }
  }, []);

  // --------------------------------------------------------------------------

  return (
    <>
      <div>
        <ProductInfo
          toggleState={toggleState}
          clickToChangeToggle={clickToChangeToggle}
          handleAddNumber={handleAddNumber}
          categoryId={categoryId}
        />
      </div>
    </>
  );
}

export default ProductSquare;
