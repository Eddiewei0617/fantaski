import React from "react";
import MemberList from "../../components/member/MemberList";
import CommentsInMember from "../../components/member/commentsinMember/CommentsInMember";

function MemberComment({ setShowCourse }) {
  return (
    <div>
      <MemberList />
      <div className="text-center">
        <CommentsInMember setShowCourse={setShowCourse} />
      </div>
    </div>
  );
}

export default MemberComment;
