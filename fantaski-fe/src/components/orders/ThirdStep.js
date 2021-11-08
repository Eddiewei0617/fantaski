// import ProgressBar from "./ProgressBar";
import OrderFinal from "./OrderFinal";
import PrevStepIcon from "./PrevStepIcon";
import OrderSubmitIcon from "./OrderSubmitIcon";

function ThirdStep() {
  return (
    <>
      {/* <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar />
      </div> */}
      <OrderFinal />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
        <OrderSubmitIcon />
      </div>
    </>
  );
}

export default ThirdStep;
