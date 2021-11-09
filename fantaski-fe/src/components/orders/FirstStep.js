import { useState, useEffect } from "react";
// import ProgressBar from "./ProgressBar";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";
import NextStepIcon from "./NextStepIcon";

function FirstStep({ orderProduct, progressMoving, step, setStep }) {
  // console.log(step);
  // useEffect(() => {
  //   setStep(1);
  // }, []);
  return (
    <>
      <CartContent orderProduct={orderProduct} />

      <OrderContent />
      <div className="box3 d-flex justify-content-end m-5">
        <NextStepIcon
          progressMoving={progressMoving}
          step={step}
          setStep={setStep}
        />
      </div>
    </>
  );
}

export default FirstStep;
