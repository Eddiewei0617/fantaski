function OrderContent() {
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
                    <input type="text" value="0" className="p-0" />
                  </div>
                  <div className="col">會員點數</div>
                </div>
                <div className="row row2">
                  <div className="col">裝備總計</div>
                  <div className="col">使用點數</div>
                </div>
              </div>
              <div className="col-3  order_total">總金額</div>
            </div>
          </div>
          {/* ---------明細欄位------------- */}
        </div>
      </div>
    </>
  );
}

export default OrderContent;
