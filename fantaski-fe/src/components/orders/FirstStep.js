import ProgressBar from "./ProgressBar";
import CartContent from "./CartContent";
import OrderContent from "./OrderContent";
import NextStepIcon from "./NextStepIcon";

function FirstStep({ orderProduct }) {
  //   console.log("123", orderProduct);
  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar />
      </div>
      {/* <div className="box border border-primary m-5 p-5 h2"> */}

      <CartContent orderProduct={orderProduct} />
      {/* </div> */}
      <OrderContent />
      <div className="box3 d-flex justify-content-end m-5">
        <NextStepIcon />
      </div>
    </>
  );
}

export default FirstStep;
