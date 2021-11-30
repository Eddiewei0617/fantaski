import OrderFinal from "./OrderFinal";

function ThirdStep({
  memberPoints,
  pointUsed,
  setPointUsed,
  step,
  setStep,
  scrollToTop,
  progressAnimation,
  userInfo,
}) {
  return (
    <>
      <OrderFinal
        memberPoints={memberPoints}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
        step={step}
        setStep={setStep}
        scrollToTop={scrollToTop}
        progressAnimation={progressAnimation}
        userInfo={userInfo}
      />
    </>
  );
}

export default ThirdStep;
