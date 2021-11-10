import { Button } from "react-bootstrap";
// import { scryRenderedComponentsWithType } from "react-dom/test-utils";

function NextStepIcon({ step, setStep, scrollToTop }) {
  console.log("test", step);

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
