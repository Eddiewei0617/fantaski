import { useState, useEffect } from "react";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

function FirstStep({
  customerChoose,
  setCustomerChoose,
  memberPoints,
  setMemberPoints,
  pointUsed,
  setPointUsed,
  setItemNumber,
  itemNumber,
  progressAnimation,
  setMemberNumber,
  userInfo,
}) {
  return (
    <>
      <CartContent
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        setItemNumber={setItemNumber}
        itemNumber={itemNumber}
        progressAnimation={progressAnimation}
      />

      <OrderContent
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        memberPoints={memberPoints}
        setMemberPoints={setMemberPoints}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
        itemNumber={itemNumber}
        setMemberNumber={setMemberNumber}
        userInfo={userInfo}
      />
    </>
  );
}

export default FirstStep;
