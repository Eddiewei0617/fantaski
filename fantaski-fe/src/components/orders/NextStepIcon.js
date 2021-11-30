import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
function NextStepIcon({ step, setStep, scrollToTop, setProgressAnimation }) {
  let storage = localStorage;

  function creditAlert() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "請輸入完整信用卡資訊",
      // footer: '<a href="">Why do I have this issue?</a>'
    });
  }
  return (
    <>
      <Button
        className="nextstep"
        onClick={() => {
          // step === 1 ? setStep(2) : setStep(3);
          // scrollToTop();
          if (step === 1) {
            setStep(2);
            setProgressAnimation(2);
          }

          if (
            step === 2 &&
            (storage["number"] == null ||
              storage["number"] === "" ||
              storage["name"] == null ||
              storage["name"] === "" ||
              storage["expiry"] == null ||
              storage["expiry"] === "" ||
              storage["cvc"] == null ||
              storage["cvc"] === "")
          ) {
            creditAlert();
            setStep(2);
          }
          if (
            step === 2 &&
            (storage["number"] !== null) &
              (storage["number"] !== "") &
              (storage["name"] !== null) &
              (storage["name"] !== "") &
              (storage["expiry"] !== null) &
              (storage["expiry"] !== "") &
              (storage["cvc"] !== null) &
              (storage["cvc"] !== "")
          ) {
            setStep(3);
            setProgressAnimation(3);
          }

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
