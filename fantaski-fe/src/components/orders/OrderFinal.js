function OrderFinal() {
  return (
    <>
      <div className="order_final_bg">
        <h2>確認訂單</h2>
        <div className="order_final_bg2">
          {/* 上方欄位 */}
          <div className="container">
            <div className="row mt-5 border-bottoms">
              <div className="col-3 final_title">
                <div>訂單編號</div>
              </div>
              <div className="col-9 final_word">12312315</div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>訂購時間</div>
              </div>
              <div className="col-9 final_word">2021-11-5 22:04:23</div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>消費金額</div>
              </div>
              <div className="col-9 final_word">NT$ 3799</div>
            </div>
            <div className="row border-bottoms">
              <div className="col-3 final_title">
                <div>剩餘點數</div>
              </div>
              <div className="col-9 final_word">99 點</div>
            </div>
          </div>
          {/* 中間分隔線 */}
          <div className="middle_line"></div>

          {/* 下方總明細欄位 */}
          <form action="" className="final_form">
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
                <tr>
                  <td>
                    <input type="text" name="category" value="課程體驗" />
                  </td>
                  <td>
                    <input type="text" name="name" value="滑雪初體驗" />
                  </td>
                  <td className="">
                    <input type="text" name="" value="2021-11-05 22:04:23 " />
                  </td>
                  <td className="type_number">
                    NT$ <input type="text" name="price" value="2000" />
                  </td>
                  <td className="type_number">
                    <input type="text" name="amount" value="1" />
                  </td>
                  <td className="type_number">
                    NT$ <input type="text" name="subtotal" value="2000" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="final_total">
              <label>總計 : NT$ </label>
              <input type="text" name="total" value="3799" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderFinal;
