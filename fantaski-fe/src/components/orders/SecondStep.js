// import ProgressBar from "./ProgressBar";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";
import PrevStepIcon from "./PrevStepIcon";
import NextStepIcon from "./NextStepIcon";

function SecondStep({ step2, setStep2, progressMoving }) {
  console.log("202", progressMoving);
  return (
    <>
      <div className="d-flex justify-content-center">
        {/* <ProgressBar progressMoving={progressMoving} /> */}
      </div>

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
