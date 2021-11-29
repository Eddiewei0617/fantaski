import React from "react";
import { useState, useEffect } from "react";
import MemberList from "../../components/member/MemberList";
import $ from "jquery";
import { PRODUCTIMAGE_URL, API_URL } from "../../config/url";
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
  const [record, setRecord] = useState();
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/member/memberRecord`, {
      withCredentials: true,
    });
    setRecord(res.data);
  }, []);
  console.log(record);

  if (!record) {
    return <></>;
  }
  return (
    <>
      <div>
        <MemberList page={2} />

        <div className="w-75 mx-auto">
          <div className=" row mt-3 recordTitle p-3 ">
            <div className="col-2">訂單標號</div>
            <div className="col-2">訂單成立時間</div>
            <div className="col-2">課程數量</div>
            <div className="col-2">租賃數量</div>
            <div className="col-2">使用點數</div>
            <div className="col-2">總計</div>
          </div>
          {record.orders.map((order) => {
            return (
              <div
                class="accordion accordionWidth"
                id="accordionExample"
                key={order.id}
              >
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
                        {/* {orders.map((orderNo) => {
                          return ( */}
                        <div className=" row text-center font-weight-bold">
                          <div className="col-2">{order.order_no}</div>
                          <div className="col-2">{order.created_at}</div>
                          <div className="col-2">
                            {record.orderCourse[order.id].length}
                          </div>
                          <div className="col-2">
                            {record.orderProduct[order.id].length}
                          </div>
                          <div className="col-2">{order.point_used} 點</div>
                          <div className="col-2">$ {order.consumption}</div>
                        </div>
                        {/* );
                        })} */}
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Record;
