import React from "react";
import { withRouter } from "react-router-dom";

import MemberList from "../../components/member/MemberList";
import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";

function MemberComment(props) {
  const { setShowCourse, userInfo } = props;
  if (userInfo === null) {
    return <div></div>;
  }
  // if (userInfo.code === 1201) {
  //   alert("請先登入");
  //   props.history.push("/login");
  // }
  return (
    <div>
      <MemberList page={5} />
      <CommentsInMember setShowCourse={setShowCourse} userInfo={userInfo} />
    </div>
  );
}

export default withRouter(MemberComment);
