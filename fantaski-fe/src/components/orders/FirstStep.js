import { useState, useEffect } from "react";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

function FirstStep({ orderProduct }) {
  return (
    <>
      <CartContent orderProduct={orderProduct} />

      <OrderContent />
    </>
  );
}

export default FirstStep;
