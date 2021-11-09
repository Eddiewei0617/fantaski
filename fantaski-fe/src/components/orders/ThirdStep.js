import OrderFinal from "./OrderFinal";
import PrevStepIcon from "./PrevStepIcon";
import OrderSubmitIcon from "./OrderSubmitIcon";

function ThirdStep({ step, setStep, progressMoving, progressMoving3 }) {
  return (
    <>
      <OrderFinal />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
        <OrderSubmitIcon />
      </div>
    </>
  );
}

export default ThirdStep;
