// import NAvbar from "../components/route/Navbar";
import MemberList from "../../components//member/MemberList";
import MemberContent from "../../components/member/MemberContent";
// import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/url";
import axios from "axios";

function Member({ setShowCourse }) {
  const [showmodal, setshowmodal] = useState("false");
  const [member, setMember] = useState([]);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/member/memberInfo`);
    setMember(res.data);
  }, []);
  function toggleModal() {
    setshowmodal(!showmodal);
  }
  return (
    <div>
      {/* <NAvbar />  */}
      <div class={`memberpop ${showmodal ? "modal" : ""}`} tabindex="-1">
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header ">
              <h5 class="modal-title memberpopTitle">會員資料修改</h5>
              {/* <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
            {/* 彈跳第一行 */}
            <div class="modal-body m-3 row align-items-center ">
              <div className="col-6 row align-items-center ">
                <div className="col-6 my-3 text-center">會員姓名</div>
                <div className="col-6 my-3 text-center">
                  <input
                    className="border border-dark w-75 "
                    type="text"
                    id="fname"
                    name="fname"
                  />
                </div>
              </div>
              <div className="col-6 row align-items-center ">
                <div className="col-3 text-center">性別</div>
                <div className="col-9 d-flex justify-content-between">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                    />
                    <label class="form-check-label" for="male">
                      男
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label class="form-check-label" for="female">
                      女
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="sexual"
                      value="sexual"
                    />
                    <label class="form-check-label" for="sexual">
                      多元性別
                    </label>
                  </div>
                </div>
              </div>
              {/* 彈跳第二行 */}
              <div className="col-3 text-center my-3">生日</div>
              <div className="col-9 my-3">
                <div>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className="w-100 border border-dark"
                  />
                </div>
              </div>
              {/* 彈跳第三行 */}
              <div className="col-3 my-3 text-center">電子信箱</div>
              <div className="col-9 my-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-dark w-100"
                />
              </div>
              {/* 彈跳第四行 */}
              <div className="col-3 my-3 text-center">修改密碼</div>
              <div className="col-9 my-3">
                <input
                  type="password"
                  id="memberPassword"
                  name="memberPassword"
                  className="border border-dark w-100"
                />
              </div>
              {/* 彈跳第五行 */}
              <div className="col-3 text-center">確認密碼</div>
              <div className="col-9 my-3">
                <input
                  type="password"
                  id="confirmMemberPassword"
                  name="confirmMemberPassword"
                  className="border border-dark w-100"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="popBtn"
                data-dismiss="modal"
                onClick={toggleModal}
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <MemberList />
        <MemberContent toggleModal={toggleModal} />
        {/* <CommentsInMember setShowCourse={setShowCourse} /> */}
      </div>
    </div>
  );
}

export default Member;
