import ProgressBar from "./ProgressBar";
import CreditCard from "./CreditCard";
import OrderContent from "./OrderContent";
import PrevStepIcon from "./PrevStepIcon";
import NextStepIcon from "./NextStepIcon";

function SecondStep() {
  let penguin = document.querySelector(".penguin");
  let progressLine = document.querySelector(".first_during");
  let number2 = document.querySelector(".progress_button2 div");
  let word2 = document.querySelector(".progress_button2 p");
  function progressMoving() {
    penguin.classList.add("penguinMove");
    progressLine.classList.add("first_during_move");
    number2.style.color = "#134865";
    word2.style.color = "#134865";
    console.log("888");
  }
  // classList.add 是在原本的樣式加上新的樣式；style.className是覆蓋原本樣式
  return (
    <>
      <div className="navbar"></div>
      <div className="d-flex justify-content-center">
        <ProgressBar progressMoving={progressMoving} />
      </div>

      <CreditCard progressMoving={progressMoving} />
      <OrderContent />
      <div className="box3 d-flex justify-content-end">
        <PrevStepIcon />
        <NextStepIcon />
      </div>
    </>
  );
}

export default SecondStep;
