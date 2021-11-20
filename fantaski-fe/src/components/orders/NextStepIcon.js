import { Button } from "react-bootstrap";

function NextStepIcon({ step, setStep, scrollToTop }) {
  let storage = localStorage;

  return (
    <>
      <Button
        className="nextstep"
        onClick={() => {
          // step === 1 ? setStep(2) : setStep(3);
          // scrollToTop();
          step === 1 && setStep(2);
          (step === 2) &
            (storage["number"] == null ||
              storage["number"] === "" ||
              storage["name"] == null ||
              storage["name"] === "" ||
              storage["expiry"] == null ||
              storage["expiry"] === "" ||
              storage["cvc"] == null ||
              storage["cvc"] === "") && setStep(2);
          (step === 2) &
            ((storage["number"] !== null) &
              (storage["number"] !== "") &
              (storage["name"] !== null) &
              (storage["name"] !== "") &
              (storage["expiry"] !== null) &
              (storage["expiry"] !== "") &
              (storage["cvc"] !== null) &
              (storage["cvc"] !== "")) && setStep(3);
          // progressMoving3();
          scrollToTop();
        }}
      >
        下一步
      </Button>
    </>
  );
}

export default NextStepIcon;
