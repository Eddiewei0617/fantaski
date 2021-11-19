import { PRODUCTIMAGE_URL } from "../../config/url";
import OrderItems from "./OrderItems";

function CartContent({ orderProduct, customerChoose, setCustomerChoose }) {
  return (
    <>
      <div className="cart_content_bg">
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
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartContent;
