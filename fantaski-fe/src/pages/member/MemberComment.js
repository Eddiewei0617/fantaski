import React from "react";
import MemberList from "../../components/member/MemberList";
import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";

function MemberComment({ setShowCourse }) {
  return (
    <div>
      <MemberList />
      <CommentsInMember setShowCourse={setShowCourse} />
    </div>
  );
}

export default MemberComment;
