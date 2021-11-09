import { Button } from "react-bootstrap";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

function NextStepIcon({ progressMoving, step, setStep }) {
  console.log("test", step);
  return (
    <>
      <Button
        className="nextstep"
        onClick={() => {
          // progressMoving();
          {
            step === 0 ? setStep(2) : setStep(3);
          }
        }}
      >
        下一步
      </Button>
    </>
  );
}

export default NextStepIcon;
