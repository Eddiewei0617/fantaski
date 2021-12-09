import React from "react";
import { IMAGE_ROUTER_URL } from "../../config/url";
import { useState } from "react";
// import "./Cablecar.css";
function Cablecar() {
  return (
    <div>
      <section className="cableCar">
        <div className="cableCarTitle pt-5">纜車資訊</div>
        <div className="cableCarSection d-flex justify-content-around align-items-center">
          <div className="row">
            <div className="col-4">
              <div className="cableCarBox">
                <img src={`${IMAGE_ROUTER_URL}/skiChair.jpg`} alt="" />
                <div className="cableCarText">
                  <h2 className="p-3">纜 椅 Chairlift</h2>
                  <p>
                    纜椅在滑雪場裡面最常見的運輸設施。
                    <br />
                    它可以從單人座到八人座
                    <br />
                    因為它是吊掛在半空中的
                    <br />
                    有時會因為天氣因素風太大
                    <br />
                    或是能見度低而變緩慢或甚至停駛。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="cableCarBox">
                <img src={`${IMAGE_ROUTER_URL}/tBar.jpg`} alt="" />
                <div className="cableCarText">
                  <h2 className="p-3">T-bar 地面型牽引</h2>
                  <p>
                    初學者雪道旁。
                    <br />
                    繩索或鋼索上面掛了很多個手把
                    <br />
                    它搭載的方法是 在繩索的旁邊等待手把的到來
                    <br />
                    然後拉著手把順著 繩索往上移動。
                    <br />
                    它速度緩慢而且一個手把只能搭載一個人
                    <br />
                    也不能夠太長或設在太陡的地面。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="cableCarBox">
                <img src={`${IMAGE_ROUTER_URL}/cableCar.jpg`} alt="" />
                <div className="cableCarText">
                  <h2 className="p-3"> 空 中 纜 車</h2>
                  <p>
                    一種是鋼索上搭載多個車廂的 <br />
                    另一種是一次可以搭載幾十個乘客大車廂。 <br />
                    在所有滑雪場牽引運輸設施裡 <br />
                    纜車算是最舒適的 <br />
                    因為在乘坐時可以不受外面風雪 和溫度的影響 <br />
                    而且搭乘時不需扣上滑雪板 <br />
                    直接走進車廂裡就可以了。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cablecar;
