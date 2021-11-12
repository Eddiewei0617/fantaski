import { PRODUCTIMAGE_URL } from "../../config/url";
import OrderItems from "./OrderItems";

function CartContent({ orderProduct }) {
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
            <OrderItems />
            {/* 動態新增開始 */}
            {/* <div className="row ">
              <div className="cart_image">
                <img src={`${PRODUCTIMAGE_URL}/allblack.jfif`} alt="" />
              </div>
              <div className="col">雪板類</div>
              <div className="col">暗黑滿點雪板</div>
              <div className="col">
                <input type="date" />
              </div>
              <div className="col">$ 1200</div>
              <div className="col">
                <input type="number" value="1" min="1" />
              </div>
              <div className="col">$ 1200</div>
              <div className="col" id="1">
                <button className="btn btn-info">X</button>
              </div>
            </div> */}
            {/* 動態新增結束--------------------------- */}
            {/* <div className="row">
              <div className="col">333</div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartContent;
