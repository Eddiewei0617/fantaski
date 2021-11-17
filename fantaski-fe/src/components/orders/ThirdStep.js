import OrderFinal from "./OrderFinal";

function ThirdStep({ memberPoints, pointUsed, setPointUsed, step }) {
  return (
    <>
      <OrderFinal
        memberPoints={memberPoints}
        pointUsed={pointUsed}
        setPointUsed={setPointUsed}
        step={step}
      />
    </>
  );
}

export default ThirdStep;
