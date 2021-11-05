import { useState } from "react";
import ProgressBar from "./ProgressBar";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";
import NextStepIcon from "./NextStepIcon";

function FirstStep({ orderProduct, step2, setStep2, progressMoving }) {
  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar
          setStep2={setStep2}
          step2={step2}
          progressMoving={progressMoving}
        />
      </div>

      <CartContent orderProduct={orderProduct} />

      <OrderContent />
      <div className="box3 d-flex justify-content-end m-5">
        <NextStepIcon />
      </div>
    </>
  );
}

export default FirstStep;
