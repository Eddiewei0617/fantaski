import { useState, useEffect } from "react";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";

function SecondStep({ step, setStep }) {
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
      <div className="box3 d-flex justify-content-end"></div>
    </>
  );
}

export default SecondStep;
