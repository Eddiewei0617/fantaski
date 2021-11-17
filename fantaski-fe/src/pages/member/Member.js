import React from "react";
// import NAvbar from "../components/route/Navbar";
<<<<<<< HEAD:fantaski-fe/src/pages/Member.js
import MemberList from "../components/member/MemberList";
import MemberContent from "../components/member/MemberContent";
import CommentsInMember from "../components/member/commentsinMember/CommentsInMember";
=======
import MemberList from "../../components/member/MemberList";
import MemberContent from "../../components/member/MemberContent";
>>>>>>> route:fantaski-fe/src/pages/member/Member.js

function Member({ setShowCourse }) {
  return (
    <div>
      {/* <NAvbar />  */}
      <div className="container">
        <MemberList />
        <MemberContent />
        {/* <CommentsInMember setShowCourse={setShowCourse} /> */}
      </div>
    </div>
  );
}

export default Member;
