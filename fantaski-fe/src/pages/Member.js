import React from "react";
import NAvbar from "../components/route/Navbar";
import MemberList from "../components/member/MemberList";
import MemberContent from "../components/member/MemberContent";

function Member() {
  return (
    <div>
      <NAvbar />
      <div className="container">
        <MemberList />
        <MemberContent />
      </div>
    </div>
  );
}

export default Member;
