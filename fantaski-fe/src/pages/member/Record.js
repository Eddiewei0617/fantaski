import React from "react";
import { useState, useEffect } from "react";
import MemberList from "../../components/member/MemberList";
import $ from "jquery";
import { PRODUCTIMAGE_URL, API_URL, COURSE_IMG_URL } from "../../config/url";
import axios from "axios";
import { COURSE_NAME } from "../../config/StatusShortcut";
const moment = require("moment");
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
  console.log("record", record);

  if (!record) {
    return <></>;
  }
  return (
    <>
      <div>
        <MemberList page={2} />

        <div className="w-75 mx-auto record-bg">
          <div className=" row mt-4 recordTitle p-3 ">
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
                        <div className=" row text-center font-weight-bold">
                          <div className="col-2">{order.order_no}</div>
                          <div className="col-2">
                            {moment(order.created_at).format("YYYY-MM-DD")}
                          </div>
                          <div className="col-2">
                            {record.orderCourse[order.id].length}
                          </div>
                          <div className="col-2">
                            {record.orderProduct[order.id].length}
                          </div>
                          <div className="col-2">{order.point_used} 點</div>
                          <div className="col-2">$ {order.consumption}</div>
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
                        <div className="col-2">商品名稱</div>
                        <div className="col-3">租賃開始</div>
                        {/* <div className="col-2">租賃結束</div> */}
                        <div className="col-sm">單價</div>
                        <div className="col-sm">數量</div>
                        <div className="col-sm">小計</div>
                      </div>
                      {record.orderCourse[order.id].map((course) => {
                        return (
                          <div
                            className=" row text-center mt-2 align-items-center"
                            key={course.id}
                          >
                            <div className="col-2">
                              <div className="imgBox m-auto">
                                <img
                                  src={`${COURSE_IMG_URL}/${course.image}`}
                                />
                              </div>
                            </div>
                            <div className="col-sm">課程體驗</div>
                            <div className="col-2">
                              {COURSE_NAME[course.course_id]}
                            </div>
                            <div className="col-3">
                              {moment(course.booking_date).format("YYYY-MM-DD")}
                            </div>
                            {/* <div className="col-2">
                              {moment(course.comment_last_update).format(
                                "YYYY-MM-DD"
                              )}
                            </div> */}
                            <div className="col-sm">{course.price}</div>
                            <div className="col-sm">{course.amount}</div>
                            <div className="col-sm">
                              ${`${course.price * course.amount}`}
                            </div>
                          </div>
                        );
                      })}
                      {record.orderProduct[order.id].map((product) => {
                        return (
                          <div
                            className=" row text-center mt-2 align-items-center"
                            key={product.id}
                          >
                            <div className="col-2">
                              <div className="imgBox m-auto">
                                <img
                                  src={`${PRODUCTIMAGE_URL}/${product.image}`}
                                />
                              </div>
                            </div>
                            <div className="col-sm">商品租賃</div>
                            <div className="col-2">{product.product_name}</div>
                            <div className="col-3">
                              {moment(product.booking_date).format(
                                "YYYY-MM-DD"
                              )}
                            </div>
                            {/* <div className="col-2">
                              {moment(product.booking_date).format(
                                "YYYY-MM-DD"
                              )}
                            </div> */}
                            <div className="col-sm">${product.price}</div>
                            <div className="col-sm">{product.amount}</div>
                            <div className="col-sm">
                              ${`${product.price * product.amount}`}
                            </div>
                          </div>
                        );
                      })}
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
