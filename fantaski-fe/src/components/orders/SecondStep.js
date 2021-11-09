import { useState, useEffect } from "react";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";
import PrevStepIcon from "./PrevStepIcon";
import NextStepIcon from "./NextStepIcon";

function SecondStep({ progressMoving3, step, setStep }) {
  // 載入中Start----------------------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  // 載入中End------------------------

  return (
    <>
      <div className="d-flex justify-content-center"></div>

      <CreditCard />
      <OrderContent />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
        <NextStepIcon />
      </div>
    </>
  );
}

export default SecondStep;
