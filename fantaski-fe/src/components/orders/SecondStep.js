import ProgressBar from "./ProgressBar";
import OrderContent from "./OrderContent";
import PrevStepIcon from "./PrevStepIcon";
import NextStepIcon from "./NextStepIcon";

function SecondStep() {
  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar />
      </div>
      <div className="box border border-primary m-5 p-5 h2">信用卡</div>
      <OrderContent />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
        <NextStepIcon />
      </div>
    </>
  );
}

export default SecondStep;
