// import NAvbar from "../components/route/Navbar";
import MemberList from "../../components//member/MemberList";
import MemberContent from "../../components/member/MemberContent";
// import MemberCollect from "./MemberCollect";
// import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/url";
import axios from "axios";

function Member({ setShowCourse, setItemNumber }) {
  const [showmodal, setshowmodal] = useState("false");
  const [member, setMember] = useState(null);
  // console.log(details && details.member[0].name);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/member/memberInfo`);
    console.log(res.data);
    if (res.data.length > 0) {
      setMember(res.data);
    }
  }, []);
  function toggleModal() {
    setshowmodal(!showmodal);
  }
  if (member === null) {
    return <></>;
  }
  return (
    <div>
      {/* <NAvbar />  */}
      <div className={`memberpop ${showmodal ? "modal" : ""}`} tabindex="-1">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title memberpopTitle">會員資料修改</h5>
              {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
            {/* 彈跳第一行 */}
            <div className="modal-body m-3 row align-items-center ">
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
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                    />
                    <label className="form-check-label" for="male">
                      男
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label className="form-check-label" for="female">
                      女
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input radioWidth"
                      type="radio"
                      name="gender"
                      id="sexual"
                      value="sexual"
                    />
                    <label className="form-check-label" for="sexual">
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

            <div className="modal-footer">
              <button
                type="button"
                className="popBtn"
                data-dismiss="modal"
                onClick={toggleModal}
              >
                取消
              </button>
              <button type="submit" class="popBtn">
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <MemberList />

        <MemberContent
          toggleModal={toggleModal}
          name={member[0].name}
          point={member[0].point}
          level={member[0].level_id}
          sex={member[0].gender}
          birthday={member[0].birthday}
          img={member[0].image}
        />
        {/* <CommentsInMember setShowCourse={setShowCourse} /> */}
      </div>
    </div>
  );
}

export default Member;
