import { Button } from "react-bootstrap";

function PrevStepIcon({ step, setStep, scrollToTop }) {
  return (
    <>
      <Button
        className="prevstep"
        onClick={() => {
          step === 3 ? setStep(2) : setStep(1);
          scrollToTop();
        }}
      >
        上一步
      </Button>
    </>
  );
}

export default PrevStepIcon;
