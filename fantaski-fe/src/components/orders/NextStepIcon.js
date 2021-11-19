import { Button } from "react-bootstrap";

function NextStepIcon({ step, setStep, scrollToTop }) {
  return (
    <>
      <Button
        className="nextstep"
        onClick={() => {
          step === 1 ? setStep(2) : setStep(3);
          scrollToTop();
        }}
      >
        下一步
      </Button>
    </>
  );
}

export default NextStepIcon;
