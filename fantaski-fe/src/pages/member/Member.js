// import NAvbar from "../components/route/Navbar";
import MemberList from "../../components//member/MemberList";
import MemberContent from "../../components/member/MemberContent";
// import MemberCollect from "./MemberCollect";
// import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/url";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Member({ setShowCourse, userInfo }) {
  const MySwal = withReactContent(Swal);
  const [showmodal, setshowmodal] = useState("false");
  const [member, setMember] = useState(null);
  // const { active, setActive } = props;
  let history = useHistory();

  // console.log(details && details.member[0].name);
  useEffect(async () => {
    let res = await axios.get(`${API_URL}/member/memberInfo`, {
      withCredentials: true,
    });
    console.log(res.data[0]);
    if (res.data.length > 0) {
      setMember(res.data[0]);
    }
  }, []);
  function toggleModal() {
    setshowmodal(!showmodal);
  }
  if (member === null) {
    return <></>;
  }
  function handleChange(e) {
    let newMember = { ...member, [e.target.name]: e.target.value };
    console.log("newMember", newMember);
    setMember(newMember);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/member/memberupdate`, member, {
        withCredentials: true,
      });

      if (res.data.result === "true") {
        MySwal.fire({
          title: res.data.message,
          icon: "success",
        });
      } else {
        MySwal.fire({
          title: res.data.message,
          icon: "error",
        });
      }
    } catch (e) {
      console.log("會員資料修改錯誤唷", e);
    }
    setshowmodal(!showmodal);
    //window.location.reload();
    //console.log("member", member);
  }
  // console.log(member);

  if (member === undefined) {
    return <></>;
  }

  return (
    <div>
      {/* <NAvbar />  */}
      <form onSubmit={handleSubmit}>
        <div
          class={`memberpop ${showmodal ? "modal stopScroll" : ""}`}
          tabindex="-1"
        >
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title memberpopTitle">會員資料修改</h5>
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
              <div class="modal-body m-3 row align-items-center ">
                <div className="col-6 row align-items-center ">
                  <div className="col-6 my-3 text-center">會員姓名</div>
                  <div className="col-6 my-3 text-center">
                    <input
                      className="border border-dark w-75 "
                      type="text"
                      id="fname"
                      name="name"
                      defaultValue={member.name}
                      required
                      onChange={handleChange}
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
                        checked={member.gender === "male"}
                        onChange={handleChange}
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
                        checked={member.gender === "female"}
                        onChange={handleChange}
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
                        checked={member.gender === "sexual"}
                        onChange={handleChange}
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
                      defaultValue={member.birthday}
                      onChange={handleChange}
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
                    defaultValue={member.email}
                    required
                    onChange={handleChange}
                  />
                </div>
                {/* 彈跳第四行 */}
                {/* <div className="col-3 my-3 text-center">修改密碼</div>
              <div className="col-9 my-3">
                <input
                  type="password"
                  id="memberPassword"
                  name="memberPassword"
                  className="border border-dark w-100"
                />
              </div> */}
                {/* 彈跳第五行 */}
                {/* <div className="col-3 text-center">確認密碼</div>
              <div className="col-9 my-3">
                <input
                  type="password"
                  id="confirmMemberPassword"
                  name="confirmMemberPassword"
                  className="border border-dark w-100"
                />
              </div> */}
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
      </form>
      <div className="container">
        <MemberList page={1} />

        <MemberContent
          toggleModal={toggleModal}
          name={member.name}
          point={member.point}
          level={member.level_id}
          sex={member.gender}
          birthday={member.birthday}
          img={member.image}
          email={member.email}
          userInfo={userInfo}
        />
        {/* <CommentsInMember setShowCourse={setShowCourse} /> */}
      </div>
    </div>
  );
}

export default Member;
