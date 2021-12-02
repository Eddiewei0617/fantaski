import OrderItems from "./OrderItems";

function CartContent({
  customerChoose,
  setCustomerChoose,
  setItemNumber,
  itemNumber,
  progressAnimation,
}) {
  return (
    <>
      <div
        className={`
          ${progressAnimation === 1 && "slit-in-vertical"}
          cart_content_bg`}
      >
        <div className="row header">
          <div className="col-sm">圖片</div>
          <div className="col-sm">種類</div>
          <div className="col-sm">商品名稱</div>
          <div className="col-sm">購買/租賃日期</div>
          <div className="col-sm">單價</div>
          <div className="col-sm">數量</div>
          <div className="col-sm">小計</div>
          <div className="col-sm">刪除</div>
        </div>

        <div className="cart_content">
          <div>
            <OrderItems
              customerChoose={customerChoose}
              setCustomerChoose={setCustomerChoose}
              setItemNumber={setItemNumber}
              itemNumber={itemNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartContent;
