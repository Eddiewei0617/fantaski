import React from "react";
import MemberList from "../../components/member/MemberList";
import $ from "jquery";
import { PRODUCTIMAGE_URL } from "../../config/url";
import axios from "axios";
function Record() {
  // collapse.collapse();
  function buttonToggle(e) {
    let target =
      e.currentTarget.parentElement.parentElement.parentElement.children[1];
    if (target.classList == "collapse") {
      target.classList.add("show");
    } else {
      target.classList.remove("show");
    }
  }
  return (
    <>
      <div>
        <MemberList />
        <div className="w-75 mx-auto">
          <div className=" row mt-3 recordTitle p-3 ">
            <div className="col-2">訂單標號</div>
            <div className="col-2">訂單成立時間</div>
            <div className="col-2">課程數量</div>
            <div className="col-2">租賃數量</div>
            <div className="col-2">使用點數</div>
            <div className="col-2">總計</div>
          </div>
          <div class="accordion accordionWidth" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button
                    class="btn btn-light btn-block text-left  text-decoration-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={buttonToggle}
                  >
                    <div className=" row text-center font-weight-bold">
                      <div className="col-2">190124011229</div>
                      <div className="col-2">2021-10-04 18:15:00</div>
                      <div className="col-2">2</div>
                      <div className="col-2">1</div>
                      <div className="col-2">1 點</div>
                      <div className="col-2">$3799</div>
                    </div>
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <div className=" row text-center align-items-center ">
                    <div className="col-2">照片</div>
                    <div className="col-sm">商品類別</div>
                    <div className="col-sm">商品名稱</div>
                    <div className="col-2">租賃開始</div>
                    <div className="col-2">租賃結束</div>
                    <div className="col-sm">單價</div>
                    <div className="col-sm">數量</div>
                    <div className="col-sm">小計</div>
                  </div>
                  <div className=" row text-center mt-2 align-items-center">
                    <div className="col-2">
                      <div className="imgBox m-auto">
                        <img src={`${PRODUCTIMAGE_URL}/snowmobile2.jpg`} />
                      </div>
                    </div>
                    <div className="col-sm">課程體驗</div>
                    <div className="col-sm">滑雪初體驗</div>
                    <div className="col-2">2021-08-05-18:15</div>
                    <div className="col-2">2021-08-08-18:15</div>
                    <div className="col-sm">$1500</div>
                    <div className="col-sm">1</div>
                    <div className="col-sm">$1500</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                  <button
                    class="btn btn-light btn-block text-left collapsed text-decoration-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    onClick={buttonToggle}
                  >
                    Collapsible Group Item #2
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  Some placeholder content for the second accordion panel. This
                  panel is hidden by default.
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                  <button
                    class="btn btn-light btn-block text-left collapsed text-decoration-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    onClick={buttonToggle}
                  >
                    Collapsible Group Item #3
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  And lastly, the placeholder content for the third and final
                  accordion panel. This panel is hidden by default.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Record;
