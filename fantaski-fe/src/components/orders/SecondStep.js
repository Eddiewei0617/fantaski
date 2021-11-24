import { useState, useEffect } from "react";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";

function SecondStep({
  step,
  memberPoints,
  setMemberPoints,
  pointUsed,
  setPointUsed,
  progressAnimation,
}) {
  // 載入中Start----------------------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // 載入中End------------------------
  console.log(pointUsed);
  return (
    <>
      <CreditCard
        memberPoints={memberPoints}
        step={step}
        progressAnimation={progressAnimation}
      />
      <OrderContent
        step={step}
        memberPoints={memberPoints}
        setMemberPoints={setMemberPoints}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
      />
    </>
  );
}

export default SecondStep;
