function CartContent({ orderProduct }) {
  // console.log("123", orderProduct);
  for (let i = 0; i < 4; i++) {}
  return (
    <>
      <div className="cart_content_bg">
        <div className=" ">
          <div className="row header">
            <div className="col-sm">圖片</div>
            <div className="col-sm">種類</div>
            <div className="col-sm">商品名稱</div>
            <div className="col-sm">購買/租賃日期</div>
            <div className="col-sm">單價</div>
            <div className="col-sm">數量</div>
            <div className="col-sm">小計</div>
          </div>
        </div>
        <div className="cart_content">
          <div>
            <div className="row ">
              <div className=" cart_image">
                <img src={orderProduct.image} alt="" />
              </div>
              <div className="col">
                <div>{orderProduct.category}</div>
              </div>
              <div className="col">{orderProduct.name}</div>
              <div className="col">
                <input type="date" />
              </div>
              <div className="col">$ {orderProduct.price}</div>
              <div className="col">
                <input type="number" value="" />
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col">333</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartContent;
