import { useState, useEffect } from "react";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

function FirstStep({ orderProduct, customerChoose, setCustomerChoose }) {
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
      />
    </>
  );
}

export default FirstStep;
