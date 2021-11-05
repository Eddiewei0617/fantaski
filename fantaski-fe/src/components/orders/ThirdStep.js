import ProgressBar from "./ProgressBar";
import OrderFinal from "./OrderFinal";
import PrevStepIcon from "./PrevStepIcon";
import OrderContent from "./OrderContent";

function ThirdStep() {
  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar />
      </div>
      <OrderFinal />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
      </div>
    </>
  );
}

export default ThirdStep;
