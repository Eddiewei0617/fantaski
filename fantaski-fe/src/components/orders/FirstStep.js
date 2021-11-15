import { useState, useEffect } from "react";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

function FirstStep({
  orderProduct,
  customerChoose,
  setCustomerChoose,
  memberPoints,
  setMemberPoints,
}) {
  return (
    <>
      <CartContent
        orderProduct={orderProduct}
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
      />

      <OrderContent
        customerChoose={customerChoose}
        setCustomerChoose={setCustomerChoose}
        memberPoints={memberPoints}
        setMemberPoints={setMemberPoints}
      />
    </>
  );
}

export default FirstStep;
