import OrderFinal from "./OrderFinal";

function ThirdStep({
  memberPoints,
  pointUsed,
  setPointUsed,
  step,
  setStep,
  scrollToTop,
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
      />
    </>
  );
}

export default ThirdStep;
