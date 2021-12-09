// 內建通用型元件
import { useState, useEffect } from "react";

// 手風琴不同種類商品的components切換
import ProductInfo from "./ProductInfo";

function ProductSquare({
  clickToChangeToggle,
  toggleState,
  setItemNumber,
  categoryId,
  memberInfo,
  collected,
  setCollectUpdate,
  cartPositionState,
  handleCollect,
  handleChecked,
  handleAddNumber,
  alreadyinCart,
}) {
  // 點加入購物車後加到locaStorage
  let storage = localStorage;
  // 為了不要讓addItemList在null的時候寫undefined
  if (storage["addItemList"] == null) {
    storage["addItemList"] = "";
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
      <div className="product-area">
        <ProductInfo
          toggleState={toggleState}
          clickToChangeToggle={clickToChangeToggle}
          handleAddNumber={handleAddNumber}
          categoryId={categoryId}
          memberInfo={memberInfo}
          collected={collected}
          setCollectUpdate={setCollectUpdate}
          cartPositionState={cartPositionState}
          handleCollect={handleCollect}
          handleChecked={handleChecked}
          alreadyinCart={alreadyinCart}
        />
      </div>
    </>
  );
}

export default ProductSquare;
