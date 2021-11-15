import { useState, useEffect } from "react";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";

function SecondStep({ step }) {
  const [pointUsed, setPointUsed] = useState(0);
  // 載入中Start----------------------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // 載入中End------------------------

  return (
    <>
      <CreditCard />
      <OrderContent
        step={step}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
      />
    </>
  );
}

export default SecondStep;
