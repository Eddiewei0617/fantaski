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
}) {
  console.log(pointUsed);
  return (
    <>
      <CartContent
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        setItemNumber={setItemNumber}
        itemNumber={itemNumber}
      />

      <OrderContent
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        memberPoints={memberPoints}
        setMemberPoints={setMemberPoints}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
        itemNumber={itemNumber}
      />
    </>
  );
}

export default FirstStep;
