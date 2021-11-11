import { useState, useEffect } from "react";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";

function FirstStep({ orderProduct, progressMoving, step, setStep }) {
  return (
    <>
      <CartContent orderProduct={orderProduct} />

      <OrderContent />
      <div className="box3 d-flex justify-content-end m-5"></div>
    </>
  );
}

export default FirstStep;
